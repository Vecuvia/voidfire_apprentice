var Scenes = {};

Scenes.Familiar = {
  running: false,
  ran: 0,
  start: function (game) {
    return game.turns === 5;
  },
  on_start: function (game) {
    if (visible(Mobs.Wizard)) {
      out("Your master coughs, turning towards you. \"Greetings, apprentice. I have a task for you.\", he says.");
    } else {
      Mobs.WizardFamiliar.position = Mobs[game.player].position;
      out("The room is filled with the smell of sulphur, and your master's familiar appears in a puff of black smoke.\n\n\"The master wants to speak with you.\", it says in a low, gravelly voice.");
      register_hook("post_moving", "familiar_follows", function (game, direction) {
        if (adjacent(Mobs.WizardFamiliar, Mobs[game.player])) {
          move_mob(Mobs.WizardFamiliar, direction);
        }
      });
    }
  },
  end: function (game) {
    return Mobs[game.player].position === "TowerLaboratory";
  },
  on_end: function (game) {
    if (visible(Mobs.WizardFamiliar)) {
      out("The smell of sulphur once again fills the room as your master's familiar disappears in a puff of black smoke.");
      out("Your master coughs, turning towards you. \"Greetings, apprentice. I have a task for you.\", he says.");
      unregister_hook("post_moving", "familiar_follows");
    }
    Mobs.WizardFamiliar.position = null;
  },
  each_turn: function (game) {}
};

Scenes.DummyScene = {
  running: false,
  ran: 0,
  start: always_false,
  on_start: no_op,
  end: always_false,
  on_end: no_op,
  each_turn: no_op
};