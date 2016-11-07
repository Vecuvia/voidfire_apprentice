var Commands = [];

//Look command - simply invoke the `look` function
Commands.push({
  pattern: "^l|look$",
  execute: function (game, captures) {
    look(game);
  }
});

//Examine/look at command
Commands.push({
  pattern: "^(x|look\\s+at|examine)\\s+(\\w+)$",
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
      if (Items[item].position === position && Items[item].keywords.includes(examined)) {
        out(Items[item].description);
        return;
      }
    }
  }
});

//Goto command
Commands.push({
  pattern: "^(go\\s+)?((north|n|south|s|east|e|west|w|up|u|down|d)(?!\\w+)|to\\s+(\\w+))$",
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