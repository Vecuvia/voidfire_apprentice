var Mobs = {};

Mobs.Player = {
  position: "TowerMageQuarters",
  name: "yourself",
  keywords: ["me", "self", "myself"],
  short_description: "You are standing here.",
  description: "You are a bit drab in your brown shirt and pants, but not unpleasant to the eye.",
};

Mobs.WizardFamiliar = {
  position: null,
  name: "wizard's imp",
  keywords: ["imp", "familiar", "wizard's imp", "wizard's familiar"],
  short_description: "The wizard's familiar is here, idly flapping its wings, looking expectantly at you.",
  description: "It's a short, stocky creature, with dark red skin and stubby wings, dressed only in a loincloth.",
  each_turn: function (game) {
    if (game.turns === 5) {
      Mobs.WizardFamiliar.position = Mobs[game.player].position;
      out("The room is filled with the smell of sulphur, and your master's familiar appears in a puff of black smoke.");
    }
  }
}

Mobs.DummyMob = {
  position: "DummyRoom",
  name: "dummy mob",
  keywords: ["dummy", "mob", "dummy mob"],
  short_description: "A dummy mob is standing here.",
  description: "It's just a dummy mob."
};