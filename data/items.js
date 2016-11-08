var Items = {};

Items.CanopyBed = {
  position: "TowerMageQuarters",
  article: "a",
  name: "canopy bed",
  keywords: ["canopy", "bed", "canopy bed", "master's bed"],
  scenery: true,
  gettable: false,
  short_description: "",
  description: "It's a huge four-poster bed with an heavy canopy, excellent to keep warm in the long night of the void."
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