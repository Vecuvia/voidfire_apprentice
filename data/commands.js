var Commands = [];

//Commands must return the number of minutes elapsed. `undefined` will be
// treated as 0.

//Look command - simply invoke the `look` function
Commands.push({
  pattern: "^(l|look)$",
  execute: function (game, captures) {
    look(game);
  }
});

//Examine/look at command
Commands.push({
  pattern: "^(x|look\\s+at|examine)\\s+(.+)$",
  execute: function (game, captures) {
    var examined = captures[2];
    var position = Mobs[game.player].position;
    for (var mob in Mobs) {
      if (Mobs[mob].position === position && Mobs[mob].keywords.includes(examined)) {
        out(Mobs[mob].description);
        return;
      }
    }
    for (var item in Items) {
      if ((Items[item].position === position || Items[item].position === game.player) && Items[item].keywords.includes(examined)) {
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
      if (Mobs[mob].position === Mobs[game.player].position && Mobs[mob].keywords.includes(target) && Mobs[mob].conversation) {
        for (var i = 0; i < Mobs[mob].conversation.length; i++) {
          var subject = Mobs[mob].conversation[i];
          if (subject.keywords.includes(topic) && subject.check(game)) {
            if (!Mobs[mob].topics.includes(subject.name)) {
              subject.first_time(game);
            } else {
              subject.following(game);
            }
            return 1;
          }
        }
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

//Get command
Commands.push({
  pattern: "^(g|get|take|pick\\s+up)\\s+(.+)$",
  execute: function (game, captures) {
    var taken = captures[2];
    for (var item in Items) {
      if (Items[item].position === Mobs[game.player].position && Items[item].keywords.includes(taken)) {
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
      out("You go " + direction + ".");
      goto(game, Rooms[position].exits[direction]);
      return 1;
    } else {
      out("You can't go in that direction.");
    }
  }
});

Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});