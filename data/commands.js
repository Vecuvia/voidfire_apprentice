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
    for (var mob in Mobs) {
      if (Mobs[mob].keywords.includes(examined)) {
        out(Mobs[mob].description);
        return;
      }
    }
    for (var item in Items) {
      if (Items[item].keywords.includes(examined)) {
        out(Items[item].description);
        return;
      }
    }
  }
});

Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});