var Scenes = {};

Scenes.Familiar = {
  running: false,
  ran: 0,
  start: function (game) {
    return game.turns === 5;
  },
  on_start: function (game) {
    if (visible("Wizard", true)) {
      out("Your master coughs, turning towards you. \"Greetings, apprentice. I have a task for you.\", he says.");
    } else {
      Mobs.WizardFamiliar.position = Mobs[game.player].position;
      out("The room is filled with the smell of sulphur, and your master's familiar appears in a puff of black smoke.\n\n\"The master wants to speak with you.\", it says in a low, gravelly voice.");
    }
  },
  end: function (game) {
    return Mobs[game.player].position === "Somewhere";
  },
  on_end: function (game) {
    if (visible("WizardFamiliar", true)) {
      out("The smell of sulphur once again fills the room as your master's familiar disappears in a puff of black smoke.");
    }
    Mobs.WizardFamiliar.position = null;
  },
  each_turn: function (game) {}
};