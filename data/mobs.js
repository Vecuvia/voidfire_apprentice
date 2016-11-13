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
        out("\"He's waiting for you in the laboratory, down to the ground floor.\", it says.");
      },
      following: function (game) {
        out("\"He's in the laboratory, down to the ground floor.\"");
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
  position: "TowerLaboratory",
  article: "The ",
  name: "wizard",
  keywords: ["wizard", "master"],
  pronoun: "he",
  short_description: "Clad in heavy blue robes, your master is busy working on some experiment.",
  description: "He's bespectacled and balding, wearing the rich blue robes of an high level wizard.",
  each_turn: function (game) {
    if (visible("Wizard", true) && Scenes.Familiar.ran === 0) {
      out("The wizard putters around with the glassware.");
    }
  },
  topics: [],
  conversation: [
    {
      name: "task",
      description: "what the task is",
      keywords: ["what", "task", "what is the task"],
      check: function (game) {
        return Scenes.Familiar.ran > 0;
      },
      first_time: function (game) {
        out("\"Yes, right, the task.\", he says. \"I have a parcel to deliver to the wizards' council, but I can't leave my experiment right now.\"\n\n\"You'll have to deliver it for me.\"\n\nHe hands you a small packet.");
        Items.Parcel.position = game.player;
      },
      following: function (game) {
        out("\"As I said, you'll have to deliver that parcel to the wizards' council.\"");
      }
    },
    {
      name: "where",
      description: "how to reach the council",
      keywords: ["how", "council", "reach", "wizard's council", "how to reach the council", "where is the council"],
      check: function (game) {
        return Mobs.Wizard.topics.includes("task");
      },
      first_time: function (game) {
        out("\"Oh, yes. I almost forgot. You need to go through the mirror in the library, it's tuned to the council's location right now.\", he says, before going back to his experiment.");
      },
      following: function (game) {
        out("\"You need to go through the mirror in the library.\"");
      }
    }
  ]
};

/*Mobs.DummyMob = {
  position: "DummyRoom",
  name: "dummy mob",
  keywords: ["dummy", "mob", "dummy mob"],
  pronoun: "it",
  short_description: "A dummy mob is standing here.",
  description: "It's just a dummy mob.",
  topics: [],
  conversation: [
    {
      name: "topic-name",
      description: "something about a topic",
      keywords: ["topic", "something", "what about the topic"],
      check: always_true,
      first_time: function (game) {},
      following: function (game) {}
    }
  ]
};*/