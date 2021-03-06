const GAME_NAME = "The Voidfire Apprentice";
const GAME_DESCRIPTION = "A rescuee from a broken reality, you were apprenticed to the wizard of the Voidfire tower.";
const IFID = "6C174D52-81BF-4832-9A6E-322296CF7040";
const VERSION = "2016-11-08 15:18";

const GAME_INTRODUCTION = "Two years ago your reality shattered. Things from the void came through the cracks, and you barely managed to escape with your life by diving through an opened gate. On the other side a group of wizards was waiting to go through to rescue one of their colleagues.\n\nThey rescued you, tending to your wounds, and when you woke up again you learned your world was no more. One of them took you as his apprentice, and since then you lived in the Voidfire tower, doing menial work and learning about magic.\n\nToday you are busing cleaning your master's quarters and learning about the finer points of broom handling.";

GAME_SAVE_SLOT = "voidfire-save";

//Initializes the game world
function initialize_game_data () {
  return {
    player: "Player",
    handler: "handle_command",
    turns: 0,
    history: [],
    history_index: 0
  }
}

//Saves the game world
function save_game (game) {
  //TODO
}

//Loads the game world
function load_game (game) {
  //TODO
}

//Updates the status bar
function update_statusbar (game) {
  left(Rooms[Mobs[game.player].position].name);
  right("Healthy");
}