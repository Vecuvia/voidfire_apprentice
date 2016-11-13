var Scenes = {};

Scenes.CleaningUp = {
  running: true,
  ran: 0,
  start: always_false,
  on_start: no_op,
  end: function (game) {
    return Scenes.Familiar.start(game);
  },
  on_end: no_op,
  each_turn: no_op,
  hint: function (game) {
    if (Items.Broom.position === game.player) {
      out("Have you tried `SWEEPing`?");
    } else {
      if (visible(Items.Broom)) {
        out("There is a broom here. Why not `PICK` it up?");
      } else {
        out("You saw a broom somewhere. Go look for it!");
      }
    }
  }
};

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
        var went = adjacent(Mobs.WizardFamiliar, Mobs[game.player]);
        if (went) {
          move_mob(Mobs.WizardFamiliar, went);
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
  each_turn: function (game) {},
  hint: function (game) {
    if (Mobs.WizardFamiliar.topics.includes("where")) {
      out("Your master is waiting for you at the ground floor. You shouldn't make him wait.");
    } else {
      out("There is the master's familiar here. Have you tried `TALKing` to it?");
    }
  }
};

Scenes.DeliverTheParcel = {
  running: false,
  ran: 0,
  start: function (game) {
    return Items.Parcel.location === game.player;
  },
  on_start: function (game) {},
  end: function (game) {
    return Item.Parcel.location === "CouncilInnerChamber";
  },
  on_end: function (game) {},
  each_turn: function (game) {}
};

/*Scenes.DummyScene = {
  running: false,
  ran: 0,
  start: always_false,
  on_start: no_op,
  end: always_false,
  on_end: no_op,
  each_turn: no_op
};*/