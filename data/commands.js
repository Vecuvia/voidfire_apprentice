var Commands = [];

Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});