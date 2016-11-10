var Commands = [];

//Commands must return the number of minutes elapsed. `undefined` or other 
// falsy values will be treated as 0.

//Look command - simply invoke the `look` function - takes no time
Commands.push({
  pattern: "^(l|look)$",
  execute: function (game, captures) {
    look(game);
  }
});

//Examine/look at command - takes no time
Commands.push({
  pattern: "^(x|look\\s+at|examine)\\s+(.+)$",
  execute: function (game, captures) {
    var examined = captures[2];
    //Look first at the mobs, and then at the items.
    for (var mob in Mobs) {
      if (visible(Mobs[mob]) && Mobs[mob].keywords.includes(examined)) {
        out(Mobs[mob].description);
        return;
      }
    }
    for (var item in Items) {
      if (visible(Items[item]) && Items[item].keywords.includes(examined)) {
        out(Items[item].description);
        var desc = "";
        if(Items[item].kind === "container" || Items[item].kind === "supporter") {
          var contained = within(item);
          out((Items[item].kind === "container" ? "Within ": "On ") + Items[item].article + " " + Items[item].name + " you see:\n\n");
          if (contained.length > 0) {
            desc += contained.map(function (object) {
              return " * " + Items[object].article + " " + Items[object].name;
            }).join("\n");
          } else {
            desc += "> Nothing"
          }
          out(desc);
        }
        return;
      }
    }
    out("You don't see that here.");
  }
});

//Say to command
//TODO: extend this to be able to say things to objects
//TODO: remove the "You could ask them about" when the mob has no topics
//TODO: add per-mob default conversational responses
Commands.push({
  pattern: "^(say|tell|ask)\\s+(.+)\\s+to\\s+(.+)$",
  execute: function (game, captures) {
    var topic = captures[2];
    var target = captures[3];
    for (var mob in Mobs) {
      if (visible(Mobs[mob]) && Mobs[mob].keywords.includes(target) && Mobs[mob].conversation) {
        for (var i = 0; i < Mobs[mob].conversation.length; i++) {
          var subject = Mobs[mob].conversation[i];
          if (subject.keywords.includes(topic) && subject.check(game)) {
            if (!Mobs[mob].topics.includes(subject.name)) {
              Mobs[mob].topics.push(subject.name);
              subject.first_time(game);
            } else {
              subject.following(game);
            }
            return 1;
          }
        }
        //If the topic is not understood by the mob, then give the player a
        // list of acceptable topics as if they wrote the `topics` command.
        out(Pronouns[Mobs[mob].pronoun].subject.capitalizeFirstLetter() + " doesn't seem to know anything about that. You could ask " + Pronouns[Mobs[mob].pronoun].object + " about " + Mobs[mob].conversation.filter(function (item) {
          return item.check(game);
        }).map(function (item) {
          return item.description;
        }).betterJoin(", ", ", or ") + ".");
        return 1;
      }
    }
    out("You don't see them here.");
  }
});

//Topics/talk to command
Commands.push({
  pattern: "^(talk\\s+to|topics)\\s+(.+)$",
  execute: function (game, captures) {
    var target = captures[2];
    for (var mob in Mobs) {
      //Give the player a list of acceptable topics.
      if (visible(Mobs[mob]) && Mobs[mob].keywords.includes(target) && Mobs[mob].conversation) {
        out("You could ask " + Pronouns[Mobs[mob].pronoun].object + " about " + Mobs[mob].conversation.filter(function (item) {
          return item.check(game);
        }).map(function (item) {
          return item.description;
        }).betterJoin(", ", ", or ") + ".");
        return 1;
      }
    }
    out("You don't see them here.");
  }
});

//Get command
Commands.push({
  pattern: "^(g|get|take|pick\\s+up)\\s+(.+?)(\\s+from\\s+(.+))?$",
  execute: function (game, captures) {
    var target = captures[2];
    var container = captures[4];
    var taken = null;
    if (container) {
      var box = find_item(container);
      var contained = within(box);
      for (var i = 0; i < contained.length; i++) {
        if (Items[contained[i]].keywords.includes(target)) {
          taken = contained[i];
          break;
        }
      }
    } else {
      for (var item in Items) {
        if (in_room(Items[item]) && Items[item].keywords.includes(target)) {
          taken = item;
          break;
        }
      }
    }
    if (taken) {
      if (Items[taken].gettable) {
        Items[taken].position = game.player;
        out("You pick up " + Items[taken].article + " " + Items[taken].name + ".");
        return 1;
      } else {
        out("You can't pick up " + Items[taken].article + " " + Items[taken].name + ", it's fixed in place.");
        return;
      }
    }
    out("You don't see that here.");
  }
});

//Put in/on command
Commands.push({
  pattern: "^(drop|leave|put)\\s+(.+?)\\s+(on|in)\\s+(.+)$",
  execute: function (game, captures) {
    var target = captures[2];
    var container = captures[4];
    var box = find_item(container);
    if (!box) {
      out("You don't see that here.");
      return;
    }
    for (var item in Items) {
      if (Items[item].position === game.player && Items[item].keywords.includes(target)) {
        Items[item].position = box;
        out("You put " + Items[item].article + " " + Items[item].name + (Items[box].kind === "container" ? " in " : " on ") + Items[box].article + " " + Items[box].name + ".");
        return 1;
      }
    }
    out("You aren't carrying that.");
  }
});

//Drop command
Commands.push({
  pattern: "^(drop|leave|throw\\s+away)\\s+(.+)$",
  execute: function (game, captures) {
    var dropped = captures[2];
    for (var item in Items) {
      if (Items[item].position === game.player && Items[item].keywords.includes(dropped)) {
        Items[item].position = Mobs[game.player].position;
        out("You drop " + Items[item].article + " " + Items[item].name + ".");
        return 1;
      }
    }
    out("You aren't carrying that.");
  }
});

//Inventory command
Commands.push({
  pattern: "^(i|inv|inventory)$",
  execute: function (game, captures) {
    var inv = "You are carrying:\n\n";
    var empty = true;
    for (var item in Items) {
      if (Items[item].position === game.player) {
        inv += " - " + Items[item].article + " " + Items[item].name + "\n";
        var empty = false;
      }
    }
    if (empty) {
      inv += "> Nothing";
    }
    out(inv);
  }
});

Commands.push({
  pattern: "^(sweep|clean|wipe)$",
  execute: function (game, captures) {
    if (Items.Broom.position === game.player) {
      out("You sweep the floor of the room.");
      return 5;
    } else {
      out("You aren't carrying anything to clean with.");
    }
  }
});

//Goto command
Commands.push({
  pattern: "^(go\\s+)?((north|n|south|s|east|e|west|w|up|u|down|d)(?!.+)|to\\s+(.+))$",
  execute: function (game, captures) {
    //Is it a cardinal direction, or are we looking for an adjacent room?
    var cardinal = !captures[4];
    var direction = (captures[4] || captures[3]).toLowerCase();
    var position = Mobs[game.player].position;
    if (cardinal) {
      if (direction in DirectionAliases) {
        direction = DirectionAliases[direction];
      }
    } else {
      for (var exit in Rooms[position].exits) {
        var room = Rooms[position].exits[exit];
        if (Rooms[room].keywords.includes(direction)) {
          direction = exit;
          break;
        }
      }
    }
    if (direction in Rooms[position].exits) {
      if (hook("pre_moving", direction)) {
        out("You go " + direction + ".");
        goto(game, Rooms[position].exits[direction]);
        hook("post_moving", direction);
        return 1;
      }
    } else {
      out("You can't go in that direction.");
    }
  }
});

//Enter/go through command
Commands.push({
  pattern: "^(enter|go\\s+through)\\s+(.+)$",
  execute: function (game, captures) {
    var doorway = captures[2];
    for (var item in Items) {
      if (visible(Items[item]) && Items[item].keywords.includes(examined)) {
        if (Items[item].doorway && hook("pre_moving")) {
          out("You go through " + Items[item].article + " " + Items[item].name + ".");
          goto(game, Items[item].doorway);
          hook("post_moving");
        } else {
          out("You can't enter that.");
        }
        return;
      }
    }
    out("You don't see that here.");
  }
});

//Wait command
Commands.push({
  pattern: "^(z|wait)(\\s+(\\d+)(\\s+minutes)?)?$",
  execute: function (game, captures) {
    var wait = 5;
    if (captures[3]) {
      wait = parseInt(captures[3]);
    }
    out("You wait " + wait + " minutes.");
    return wait;
  }
});

//Help command
Commands.push({
  pattern: "^(h|help|help me|what do I do)$",
  execute: function (game, captures) {
    out("**The Voidfire Apprentice** is a mostly traditional interactive fiction - this means you interact with the game world through a prompt, and that the game answers your commands with text.\n\nCommands usually take the form of `> VERB OBJECT` - some commands can have more than one target, like `> SAY HELLO TO BLACKSMITH`.\n\nYou can `GO` in any cardinal direction, or `GO TO` an adjacent room. You can examine your surroundings with the `LOOK` command and further `LOOK AT/EXAMINE` individual objects. You can also `GET/TAKE/PICK UP` objects on the ground and `DROP/LEAVE` carried items. You can take your `INVENTORY`, interact with people by finding out what `TOPICS` they are willing to talk about and by `ASKing/TELLing/SAYing STUFF TO` them. You can get further `HELP` by asking for `HINTS`.");
  }
});

//Hints command
Commands.push({
  pattern: "^(hint|hints)$",
  execute: function (game, captures) {
    //This grabs the hints for every running scene, but I don't know in what
    // order they'll be shown.
    for (var scene in Scenes) {
      if (Scenes[scene].running && Scenes[scene].hint) {
        Scenes[scene].hint(game);
      }
    }
  } 
});

//Look up command
Commands.push({
  pattern: "^(lookup|look up)\\s+(.+)\\s+(in|into)\\s+(.+)",
  execute: function (game, captures) {
    var topic = captures[2];
    var target = captures[4];
    var book = null;
    for (var item in Items) {
      if ((in_room(Items[item]) || Items[item].position === game.player) && Items[item].keywords.includes(keyword)) {
        book = Item[item];
        break;
      }
    }
    if (book) {
      if (book.topics) {
        for (var i = 0; i < book.topics.length; i++) {
          if (book.topics[i].keywords.includes(topic)) {
            out(book.topics[i].description);
            return 1;
          }
        }
        out("There's nothing there about that topic.");
        return;
      }
      out("That's not a book.");
      return;
    }
    out("You don't see that here.");
  }
});

/*
Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});
*/