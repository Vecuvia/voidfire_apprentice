---
title: The Voidfire Apprentice - Making Of
date: 2016-11-07 15:21
---

# Part 1 - Introduction

As I already have too many side projects, I decided to start yet another one - trying to keep it simple this time, building a short piece of interactive fiction from scratch in Javascript.

After sketching out the story in my journal, I set up the folder structure for the project: inside the `[2016-11-07] voidfire_apprentice` folder I created five more folders, `css`, `data`, `dist` (for libraries), `js` and `writing`.

I found and downloaded in `dist` the libraries that I was going to use - Zepto, Marked and Mustache, created two minimal `index.html` and `main.css` files, initialized a git repository and added a `.gitignore` file.

Once I was satisfied with the layout of my page, I started writing the js that would make up the engine of my game. I needed a way to get input from the player, to handle their commands and to scroll the page.

```javascript
//js/main.js
$("#command").on("keydown", function (event) {
  if (event.keyCode === 13) {
    $("#story").append(
      $("<p>").append($("<em>").text(event.target.value))
    );
    Handlers[game.handler](game, event.target.value);
    event.target.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});
```

To avoid the player being confused when confronted with the page, I made it so the input box would be focused on page load.

```javascript
//js/main.js
$("#command").focus();
```

Finally, I wrote and called the initializer function, showed the game banner and added a check to allow for loading of a saved game.

```javascript
//data/main.js
function initialize_game_data () {
  return {
    handler: "handle_command"
  }
}

//js/common.js

function show_banner () {
  out("# " + GAME_NAME + "\n\n" + GAME_DESCRIPTION + "\n\n**IFID:** " + 
      IFID + "  \n**Version:** " + VERSION);
}

function introduction () {
  out(GAME_INTRODUCTION);
}

//js/main.js
var game = initialize_game_data();

show_game_banner();

if (localStorage[GAME_SAVE_SLOT]) {
  out("A saved game was found. Do you want to load it?");
  game.handler = "confirm_load";
} else {
  introduction();
}
```

Now I needed to write out the handlers and the `out` function - I was going to leverage Marked to use markdown for my text output.

```javascript
//js/common.js
function out (text, box) {
  if (box === undefined) {
    box = "<div>";
  }
  $("#story").append($(box).html(marked(text)));
}

var Handlers = {}

Handlers.confirm_save = function (game, command) {
  switch (command.toLowerCase()) {
    case "y": case "yes":
      load_game();
      break;
    case "n": case "no":
      introduction();
      game.handler = "handle_command";
      break;
  }
}
```

While the `confirm_save` handler was pretty easy to write, the `handle_command` one was a bit more complex. I needed to iterate through the list of commands (contained in the `data/commands.js` file), compile and execute the regex associated with each command and, if it matches, dispatch its `execute` function. If no command is matched, the handler will reply with a smart and very useful "Uh?".

```javascript
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
```

I then proceeded to write out some utility functions for looking and moving the player from room to room. Looking was easy, albeit a bit verbose - I iterate through all the mobs and items in the game and, if they are in the same room as the player (`game.player`) and are not scenery/not the player itself, they are appended to the description of the room.

```javascript
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
```

Moving the player was even easier, requiring just two lines of code to change their position and to invoke the `look` function.

```javascript
function goto (game, room) {
  Mobs[game.player].position = room;
  look(game);
}
```

Once the basic framework was laid down I proceeded to create minimal files for commands, rooms, items and mobs.

```javascript
//data/commands.js
var Commands = [];

Commands.push({
  pattern: "^dummy$",
  execute: function (game, captures) {
    out(captures.join("; "));
  }
});

//data/rooms.js
var Rooms = {};

Rooms.DummyRoom = {
  name: "Dummy room",
  keywords: ["dummy", "dummy room"],
  description: "It's a room full of dummies.",
  exits: {}
};

//data/items.js
var Items = {};

Items.DummyItem = {
  position: "DummyRoom",
  article: "a",
  name: "dummy item",
  keywords: ["dummy item", "item"],
  scenery: false,
  gettable: true,
  short_description: "There's a dummy item here.",
  description: "It's simply a dummy item."
};

//data/mobs.js
var Mobs = {};

Mob.DummyMob = {
    position: "DummyRoom",
    name: "dummy mob",
    keywords: ["dummy", "mob", "dummy mob"],
    short_description: "A dummy mob is standing here.",
    description: "It's just a dummy mob."
};
```

This done, sketching out the rest of the world was easier, just a matter of coming up with the appropriate descriptions.