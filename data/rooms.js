var Rooms = {};

Rooms.TowerMageQuarters = {
  name: "Second floor - Master's quarters",
  keywords: ["quarters"],
  description: "Your master's quarters are quite expansive, with a canopy bed in the middle of the room, an huge wardrobe, and enough lit candles to approximate sunlight. There's a small bathroom to the east and to the north you can access the central staircase.",
  exits: {
    east: "TowerMageBathroom"
  }
};

Rooms.TowerMageBathroom = {
  name: "Second floor - Master's bathroom",
  keywords: ["bathroom"],
  description: "Your master's bathroom is a large affair, with all the amenities a modern wizard could possibly wish for: toilet, sink, bidet and a large porcelain bathtub. To the west a door leads back to the bedroom.",
  exits: {
    west: "TowerMageQuarters"
  }
};

Rooms.DummyRoom = {
  name: "Dummy room",
  keywords: ["dummy", "dummy room"],
  description: "It's a room full of dummies!",
  exits: {}
};