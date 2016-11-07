String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.betterJoin = function (middle, last) {
  var string = "";
  for (var i = 0; i < this.length - 1; i++) {
    string += this[i];
    if (i < this.length - 2) {
      string += middle;
    }
  }
  string += last + this[this.length-1];
  return string;
}

//Appends `text` to the `#story` element, after parsing it with marked, 
// wrapping it with a tag `box` (defaulting to `<div>` if nothing is 
// specified).
function out (text, box) {
  if (box === undefined) {
    box = "<div>";
  }
  $("#story").append($(box).html(marked(text)));
}

//Updates the left hand of the status bar
function left (text) {
  $("#left").html(text);
}

//Updates the right hand of the status bar
function right (text) {
  $("#right").html(text);
}

//Shows the game banner
function show_banner (game) {
  out("# " + GAME_NAME + "\n\n" + GAME_DESCRIPTION + "\n\n**IFID:** " + IFID + "  \n**Version:** " + VERSION);
}

//Shows the game introduction
function introduction (game) {
  out(GAME_INTRODUCTION);
  look(game);
}

//Describes the current room
function look (game) {
  var position = Mobs[game.player].position;
  var room = Rooms[position];
  var desc = "";
  desc += "## " + room.name + "\n\n";
  desc += room.description + "\n\n";
  for (var mob in Mobs) {
    //Add to `desc` the short description of each mob in the same room.
    if (mob !== game.player && Mobs[mob].position === position) {
      desc += Mobs[mob].short_description + "\n\n";
    }
  }
  desc += "\n\n";
  for (var item in Items) {
    //Add to `desc` the short description of each non-scenery item in the
    // same room.
    if (Items[item].position === position && !Items[item].scenery) {
      desc += Items[item].short_description + "\n\n";
    }
  }
  //TODO: possibly move this to `handle_command`
  left(room.name);
  out(desc);
}

//Jumps to a new room
function goto (game, room) {
  Mobs[game.player].position = room;
  look(game);
}

//No-op function
function no_op () {}

//Always returns true
function always_true () { return true; }

//Makes the world tick
function turn_passes (game) {
  game.turns += 1;
  for (var item in Items) {
    (Items[item].each_turn || no_op)(game);
  }
  for (var mob in Mobs) {
    (Mobs[mob].each_turn || no_op)(game);
  }
}

//The various command handlers
var Handlers = {}

Handlers.confirm_save = function (game, command) {
  switch (command.toLowerCase()) {
    case "y": case "yes":
      load_game(game);
      break;
    case "n": case "no":
      introduction(game);
      game.handler = "handle_command";
      break;
  }
}

Handlers.handle_command = function (game, command) {
  var executed = false, elapsed;
  for (var i = 0; i < Commands.length; i++) {
    var re = new RegExp(Commands[i].pattern, "i");
    var captures = re.exec(command);
    if (captures) {
      elapsed = Commands[i].execute(game, captures) || 0;
      executed = true;
      break;
    }
  }
  if (!executed) {
    out("Uh?");
  } else {
    for (var i = 0; i < elapsed; i++) {
      turn_passes(game);
    }
  }
}