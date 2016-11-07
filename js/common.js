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

//Shows the game banner
function show_banner (game) {
  out("# " + GAME_NAME + "\n\n" + GAME_DESCRIPTION + "\n\n**IFID:** " + IFID + "  \n**Version:** " + VERSION);
}

//Shows the game introduction
function introduction (game) {
  out(GAME_INTRODUCTION);
  look (game);
}

//Describes the current room
function look (game) {
  var room = Rooms[Mobs[game.player].position];
  var desc = "";
  desc += "## " + room.name + "\n\n";
  desc += room.description;
  out(desc);
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