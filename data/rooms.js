var Rooms = {};

Rooms.TowerMageQuarters = {
  name: "Second floor - Master's quarters",
  keywords: ["quarters", "bedroom"],
  description: "Your master's quarters are quite expansive, with a canopy bed in the middle of the room, an huge wardrobe, and enough lit candles to approximate sunlight. There's a small bathroom to the east and to the north you can access the central staircase.",
  exits: {
    east: "TowerMageBathroom",
    north: "TowerSecondFloor"
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

Rooms.TowerSecondFloor = {
  name: "Second floor - Staircase",
  keywords: ["staircase"],
  description: "The staircase runs along the external wall of the tower, torches keeping it well lit, going up to the library and down to your quarters. To the south a door leads to your master's quarters.",
  exits: {
    south: "TowerMageQuarters",
    down: "TowerFirstFloor",
    up: "TowerLibrary"
  }
};

Rooms.TowerFirstFloor = {
  name: "First floor - Staircase",
  keywords: ["staircase"],
  description: "The staircase runs along the external wall of the tower, torches keeping it well lit, going up to your master's quarters and down to the laboratory. To the north a door leads to your quarters.",
  exits: {
    up: "TowerSecondFloor",
    north: "TowerYourBedroom"
  }
};

Rooms.TowerYourBedroom = {
  name: "First floor - Your quarters",
  keywords: ["quarters", "bedroom"],
  description: "Your room is not large, with just enough space for a small bed, wardrobe and desk. To the south you can access the central staircase.",
  exits: {
    south: "TowerFirstFloor"
  }
};

Rooms.TowerLibrary = {
  name: "Third floor - Library",
  keywords: ["library"],
  description: "The library of the tower is expansive, bookshelves piled with books of every sort covering every wall. To one side there is a table surrounded by a couple of comfortable couches. You can go down to your master's quarters.",
  exits: {
    down: "TowerSecondFloor"
  }
};

Rooms.DummyRoom = {
  name: "Dummy room",
  keywords: ["dummy", "dummy room"],
  description: "It's a room full of dummies!",
  exits: {}
};