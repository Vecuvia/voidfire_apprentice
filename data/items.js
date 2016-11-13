var Items = {};

Items.CanopyBed = {
  position: "TowerMageQuarters",
  article: "the",
  name: "canopy bed",
  keywords: ["canopy", "bed", "canopy bed", "master's bed"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "It's a huge four-poster bed with an heavy canopy, excellent to keep warm in the long nights of the void."
};

Items.HugeWardrobe = {
  position: "TowerMageQuarters",
  article: "the",
  name: "huge wardrobe",
  keywords: ["huge", "wardrobe", "huge wardrobe", "master's wardrobe"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "The wardrobe is huge, taking up all the space on the east wall, and locked shut."
};

Items.Fireplace = {
  position: "TowerMageQuarters",
  article: "the",
  name: "fireplace",
  keywords: ["fireplace", "roaring", "fire", "roaring fireplace"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "Set in the east wall, the fireplace is roaring, warming up the whole room."
};

Items.MasterToilet = {
  position: "TowerMageBathroom",
  article: "the",
  name: "toilet",
  keywords: ["toilet"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "It's just a toilet."
};

Items.MasterSink = {
  position: "TowerMageBathroom",
  article: "the",
  name: "sink",
  keywords: ["sink", "mirror"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "It's simply a sink, with warm and cold water and a mirror above."
};

Items.MasterBathtub = {
  position: "TowerMageBathroom",
  article: "the",
  name: "large bathtub",
  keywords: ["bathtub", "tub"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "A large white porcelain affair, standing on four brass feet."
};

Items.YourDesk = {
  kind: "supporter",
  position: "TowerYourBedroom",
  article: "your",
  name: "desk",
  keywords: ["my desk", "desk", "table"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "",
};

Items.YourSpellbook = {
  position: "YourDesk",
  article: "your",
  name: "spellbook",
  keywords: ["my spellbook", "spellbook", "book"],
  scenery: false,
  gettable: true,
  short_description: "You left your spellbook here.",
  description: "It's a small leather-covered ring binder containing all the notes you took through your apprenticeship. You could `LOOK UP` something `INTO` it.",
  topics: [
    {
      keywords: ["council", "wizard's council"],
      description: "You penned down a few paragraphs or so about the council.\n\nThe wizard's council was founded about two centuries ago, after the last reality quake broke up and mixed together a dozen universes. It was originally born as a collaborative attempt to put those universes back together, helping the scattered people go back to their respective homes."
    }
  ]
};

Items.Broom = {
  position: "TowerMageQuarters",
  article: "a",
  name: "broom",
  keywords: ["broom", "straw", "straw broom", "besom"],
  scenery: false,
  gettable: true,
  short_description: "A broom has been left here, leaning against a wall.",
  description: "It's a fairly standard straw broom, with a smooth, knotted handle."
};

Items.Parcel = {
  position: null,
  article: "the",
  name: "parcel",
  keywords: ["parcel", "packet"],
  scenery: false,
  gettable: true,
  short_description: "You left here the parcel for the wizard's council.",
  description: "The parcel is not large, and tightly wrapped. You don't know what is inside."
};

Items.BlackMirror = {
  position: "TowerLibrary",
  article: "a",
  name: "black mirror",
  keywords: ["black mirror", "mirror"],
  scenery: false,
  gettable: false,
  short_description: "There's a large black mirror floating in the middle of the room.",
  description: "It looks like it was fashioned out of a single piece of obsidian, and it floats in midair without any apparent means of support.",
  doorway: "CouncilOutside"
};

/*Items.DummyItem = {
  position: "DummyRoom",
  article: "a",
  name: "dummy item",
  keywords: ["dummy item", "item"],
  scenery: false,
  gettable: true,
  short_description: "There's a dummy item here.",
  description: "It's simply a dummy item."
};*/