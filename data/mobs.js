var Mobs = {};

Mobs.Player = {
  position: "TowerMageQuarters",
  article: "",
  name: "you",
  keywords: ["me", "self", "myself"],
  pronoun: "you",
  short_description: "You are standing here.",
  description: "You are a bit drab in your brown shirt and pants, but not unpleasant to the eye.",
};

Mobs.WizardFamiliar = {
  position: null,
  article: "Your ",
  name: "master's familiar",
  keywords: ["imp", "familiar", "master's imp", "master's familiar", "wizard's imp", "wizard's familiar"],
  pronoun: "it",
  short_description: "The wizard's familiar is here, idly flapping its wings, looking expectantly at you.",
  description: "It's a short, stocky creature, with dark red skin and stubby wings, dressed only in a loincloth.",
  topics: [],
  conversation: [
    {
      name: "where",
      description: "where the master is",
      keywords: ["where", "where is he", "where is the master"],
      check: always_true,
      first_time: function (game) {
        out("\"He's waiting for you in the laboratory, down to the first floor.\", it says.");
      },
      following: function (game) {
        out("\"He's in the laboratory, down to the first floor.\"");
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
};

Mobs.Wizard = {
  position: null,
  article: "The ",
  name: "wizard",
  keywords: ["wizard", "master"],
  pronoun: "he",
  short_description: "...",
  description: "...",
  each_turn: function (game) {
    if (visible("Wizard", true) && Scenes.Familiar.ran) {
      out("The wizard putters around with the glassware.");
    }
  },
  topics: [],
  conversation: []
};

Mobs.DummyMob = {
  position: "DummyRoom",
  name: "dummy mob",
  keywords: ["dummy", "mob", "dummy mob"],
  short_description: "A dummy mob is standing here.",
  description: "It's just a dummy mob."
};