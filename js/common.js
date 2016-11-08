//Utility functions
//No-op function, returns nothing
function no_op () {}

//Always returns true
function always_true () { return true; }

//Always returns false
function always_false () { return false; }

//As per the name, capitalize the first letter of a string.
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

//A "better" join function, that allows one to select a joiner for the last
// element of the array.
//For example:
//    > ["bread", "milk", "eggs"].betterJoin(", ", " and ")
//    "bread, milk and eggs"
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
  update_statusbar(game);
}

//Checks whether a mob or item is in the same room as the player
function in_room (object) {
  return object.position === Mobs[game.player].position;
}

//Checks a mob or item for visibility from the player
function visible (object) {
  return in_room(object) || object.position === game.player;
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
    if (mob !== game.player && in_room(Mobs[mob])) {
      desc += Mobs[mob].short_description + "\n\n";
    }
  }
  desc += "\n\n";
  for (var item in Items) {
    //Add to `desc` the short description of each non-scenery item in the
    // same room.
    if (in_room(Items[item]) && !Items[item].scenery) {
      desc += Items[item].short_description + "\n\n";
    }
  }
  out(desc);
}

//Jumps to a new room
function goto (game, room) {
  Mobs[game.player].position = room;
  look(game);
}

//(tries to) move a mob
function move_mob (mob, direction) {
  if (Rooms[mob.position].exits[direction]) {
    if (visible(mob)) {
      out(mob.article.capitalizeFirstLetter() + mob.name + " goes " + direction + ".");
    }
    mob.position = Rooms[mob.position].exits[direction];
    if (visible(mob)) {
      out(mob.article.capitalizeFirstLetter() + mob.name + " comes from the " + DirectionOpposites[direction] + ".");
    }
  }
}

//Checks whether two (mobs or items) are in adjacent rooms
function adjacent (object, other) {
  for (var exit in Rooms[object.position].exits) {
    if (other.position === Rooms[object.position].exits[exit]) {
      return true;
    }
  }
  return false;
}

//Makes the world tick
function turn_passes (game) {
  game.turns += 1;
  //Handle scene start, end and, if ongoing, invoke their `each_turn` function
  for (var scene in Scenes) {
    if (Scenes[scene].running) {
      Scenes[scene].each_turn(game);
      if (Scenes[scene].end(game)) {
        Scenes[scene].running = false;
        Scenes[scene].on_end(game);
      }
    } else {
      if (Scenes[scene].start(game)) {
        Scenes[scene].running = true;
        Scenes[scene].ran += 1;
        Scenes[scene].on_start(game);
      }
    }
  }
  //Iterate through all the items and mobs in the game world and, if they
  // have an `each_turn` function make them tick.
  for (var item in Items) {
    (Items[item].each_turn || no_op)(game);
  }
  for (var mob in Mobs) {
    (Mobs[mob].each_turn || no_op)(game);
  }
}

//The various command handlers
var Handlers = {}

//Handle loading of the saved game at the beginning
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

//Handle commands during play
Handlers.handle_command = function (game, command) {
  var executed = false, elapsed;
  //To avoid problems with spurious whitespace (like the one inserted by most
  // mobile keyboards at the end of a word) - #maybe use something more
  // robust than a list of keywords for matching.
  command = command.trim();
  for (var i = 0; i < Commands.length; i++) {
    var re = new RegExp(Commands[i].pattern, "i");
    var captures = re.exec(command);
    if (captures) {
      //We have a match - go, go, go. Execute the command and get how much
      // time it will take to perform. #maybe split this in two functions,
      // check and execute, and invoke execute *after* advancing the world.
      elapsed = Commands[i].execute(game, captures) || 0;
      executed = true;
      break;
    }
  }
  if (!executed) {
    out("Uh?");
  } else {
    //Let's make our world tick.
    for (var i = 0; i < elapsed; i++) {
      turn_passes(game);
    }
  }
  //Finally, update the status bar
  update_statusbar(game);
}

//Various hooks
var Hooks = {};

Hooks.pre_moving = [];
Hooks.post_moving = [];

Hooks.pre_getting = [];
Hooks.post_getting = [];

Hooks.pre_dropping = [];
Hooks.post_dropping = [];

//Registers a named hook in the `hook` stack
function register_hook (hook, name, callback) {
  Hooks[hook].push({name: name, callback: callback});
}

//Removes a named hook from the `hook` stack
function unregister_hook (hook, name) {
  for (var i = 0; i < Hooks[hook].length; i++) {
    if (Hooks[hook][i].name === name) {
      Hooks[hook].splice(i, 1);
      break;
    }
  }
}

//Executes all the hooks in the `hook` stack, an returns whether they allow
// the command to continue (used in pre hooks).
function hook (hook, args) {
  var allows = true;
  for (var i = 0; i < Hooks[hook].length; i++) {
    if (Hooks[hook][i].callback(game, args)) {
      allows = false;
    }
  }
  return allows;
}