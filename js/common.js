//Saves the game world
function save_game (game) {
  //TODO
}

//Loads the game world
function load_game (game) {
  //TODO
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
    if (mob !== game.player && Mobs[mob].position === position) {
      desc += Mobs[mob].short_description + "\n\n";
    }
  }
  desc += "\n\n";
  for (var item in Items) {
    if (Items[item].position === position && !Items[item].scenery) {
      desc += Items[item].short_description + "\n\n";
    }
  }
  left(room.name);
  out(desc);
}

//Jumps to a new room
function goto (game, room) {
  Mobs[game.player].position = room;
  look(game);
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
  var executed = false;
  for (var i = 0; i < Commands.length; i++) {
    var re = new RegExp(Commands[i].pattern, "i");
    var captures = re.exec(command);
    if (captures) {
      Commands[i].execute(game, captures);
      executed = true;
      break;
    }
  }
  if (!executed) {
    out("Uh?");
  }
}