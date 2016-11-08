var Mobs = {};

Mobs.Player = {
  position: "TowerMageQuarters",
  name: "yourself",
  keywords: ["me", "self", "myself"],
  pronoun: "you",
  short_description: "You are standing here.",
  description: "You are a bit drab in your brown shirt and pants, but not unpleasant to the eye.",
};

Mobs.WizardFamiliar = {
  position: null,
  name: "wizard's imp",
  keywords: ["imp", "familiar", "master's imp", "master's familiar", "wizard's imp", "wizard's familiar"],
  pronoun: "it",
  short_description: "The wizard's familiar is here, idly flapping its wings, looking expectantly at you.",
  description: "It's a short, stocky creature, with dark red skin and stubby wings, dressed only in a loincloth.",
  each_turn: function (game) {
    if (game.turns === 5) {
      Mobs.WizardFamiliar.position = Mobs[game.player].position;
      out("The room is filled with the smell of sulphur, and your master's familiar appears in a puff of black smoke.\n\n\"The master wants to speak with you.\", it says in a low, gravelly voice.");
    }
  },
  topics: [],
  conversation: [
    {
      name: "where",
      description: "where the master is",
      keywords: ["where", "where is he", "where is the master"],
      check: always_true,
      first_time: function (game) {
        out("\"He's waiting for you in the laboratory, down in the basement.\", it says.");
      },
      following: function (game) {
        out("\"He's in the laboratory, down in the basement.\"");
      }
    },
    {
      name: "what",
      description: "what does the master want",
      keywords: ["what", "what does he want", "what does the master want"],
      check: always_true,
      first_time: function (game) {
        out("\"You'll have to ask him yourself.\", it says.");
      },
      following: function (game) {
        out("\"I don't know.\"");
      }
    }
  ]
}

Mobs.DummyMob = {
  position: "DummyRoom",
  name: "dummy mob",
  keywords: ["dummy", "mob", "dummy mob"],
  short_description: "A dummy mob is standing here.",
  description: "It's just a dummy mob."
};