var Rooms = {};

Rooms.TowerMageQuarters = {
  name: "Second floor - Master's quarters",
  keywords: ["quarters", "bedroom"],
  description: "Your master's quarters are quite expansive, with a canopy bed in the middle of the room, an huge wardrobe, and a big fireplace. There's a bathroom to the east and to the north you can access the central staircase.",
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
    down: "TowerGroundFloor",
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

Rooms.TowerGroundFloor = {
  name: "Ground floor - Staircase",
  keywords: ["staircase", "ground", "ground floor", "laboratory"],
  description: "The staircase runs along the external wall of the tower, torches keeping it well lit, going up to your quarters and down to the basement. To the north a door leads to the laboratory. Another door to the south leads outside the tower.",
  exits: {
    up: "TowerFirstFloor",
    north: "TowerLaboratory",
    south: "TowerOutside"
  }
};

Rooms.TowerLaboratory = {
  name: "Ground floor - Laboratory",
  keywords: ["laboratory", "lab"],
  description: "The laboratory of the tower is large, well-ventilated and above all cold. A large, pitted work table covered in glassware stands to one side, and there is a summoning circle inlaid in silver in the middle of the room.",
  exits: {
    south: "TowerGroundFloor"
  }
};

Rooms.TowerOutside = {
  name: "Outside the tower",
  keywords: ["outside"],
  description: "You stand on a chunk of earth, the dark emptiness of the gulf between universes surrounding you on all sides. The Voidfire tower stands to the north.",
  exits: {
    north: "TowerGroundFloor"
  }
};

Rooms.DummyRoom = {
  name: "Dummy room",
  keywords: ["dummy", "dummy room"],
  description: "It's a room full of dummies!",
  exits: {}
};