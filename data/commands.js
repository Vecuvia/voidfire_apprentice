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
      if (visible(Mobs[mob]) && Items[item].keywords.includes(examined)) {
        out(Items[item].description);
        return;
      }
    }
    out("You don't see that here.");
  }
});

//Say command
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
  pattern: "^(g|get|take|pick\\s+up)\\s+(.+)$",
  execute: function (game, captures) {
    var taken = captures[2];
    for (var item in Items) {
      if (in_room(Items[item]) && Items[item].keywords.includes(taken)) {
        if (Items[item].gettable) {
          Items[item].position = game.player;
          out("You pick up " + Items[item].article + " " + Items[item].name + ".");
          return 1;
        } else {
          out("You can't pick up " + Items[item].article + " " + Items[item].name + ", it's fixed in place.");
          return;
        }
      }
    }
    out("You don't see that here.");
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
    var direction = captures[4] || captures[3];
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

Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});