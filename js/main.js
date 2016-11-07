//Initialize the game data
var game = initialize_game_data();

//Show the game banner
show_banner();

//If a saved game is found, ask the player whether they want to load it.
//Otherwise, go straight to the introduction.
if (localStorage[GAME_SAVE_SLOT]) {
  out("A saved game was found. Do you want to load it?");
  game.handler = "confirm_load";
} else {
  introduction();
}

//Listen to commands
$("#command").on("keydown", function (event) {
  if (event.keyCode === 13) {
    //When the player presses [ENTER] first show and handle the command, then
    // clear the input box and finally scroll to the end of the page.
    $("#story").append(
      $("<p>").append($("<em>").text(event.target.value))
    );
    Handlers[game.handler](game, event.target.value);
    event.target.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});

//Focus the input box on page load to avoid confusion by the player.
$("#command").focus();