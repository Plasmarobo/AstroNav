// Planet.js
var world_tags = [
  "Abandoned Colony",
  "Alien Ruins",
  "Altered Humanity",
  "Area 51",
  "Badlands World",
  "Bubble Cities",
  "Civil War",
  "Cold War",
  "Colonized Population",
  "Desert World",
  "Eugenic Cult",
  "Exchange Consulate",
  "Feral World",
  "Flying Cities",
  "Forbidden Tech",
  "Freak Geology",
  "Freak Weather",
  "Friendly Foe",
  "Gold Rush",
  "Hatred",
  "Heavy Industry",
  "Heavy Mining",
  "Hostile Biosphere",
  "Hostile Space",
  "Local Speciality",
  "Local Tech",
  "Major Spaceyard",
  "Minimal Conact",
  "Misandry/Misogyny",
  "Oceanic World",
  "Out of Contact",
  "Outpost World",
  "Perimeter Agency",
  "Pilgrimage Site",
  "Police State",
  "Preceptor Archieve",
  "Pretech Cultists",
  "Primitive Aliens",
  "Psionics Fear",
  "Psionics Worship",
  "Psionics Academy",
  "Quarantined World",
  "Radioactive World",
  "Regional Hegemon",
  "Restrictive Laws",
  "Rigid Culture",
  "Seagoing Cities",
  "Sealed Menace",
  "Theocracy",
  "Tomb World",
  "Trade Hub",
  "Tyranny",
  "Unbraked AI",
  "Warlords",
  "Xenophiles",
  "Xenophobes",
  "Zombies",
  "Orbital Colony",
  "Ultracapitalism",
  "Cryosleeping Population",
  "Pirate Stronghold",
  "Gangsters",
  "Mercenaries",
  "Stellar Anomaly",
  "Cybernetic Worship",
  "Cybernetic Fear",
  "Mutants",
  "Automated Defenses",
  "The Old Empire",
  "Dependant Population",
  "Charlitans",
  "Master of an Art",
  "Simulated Reality",
  "Terraforming Project",
  "Clones",
  "Hive Mind",
  "Computer Virus/Malfunction",
  "Analog Technology",
  "Immortals",
  "Zoological Reserve",
  "Scavenger Haven",
  "Penal Colony",
  "Slavery",
  "Megacity",
  "Underground Cities",
  "Terrorism",
  "Mecha",
  "Stellar Debris",
  "Electromagnetic Interference",
  "Interstellar Ark",
  "Ghosts",
  "Illuminati",
  "Desperate Populace",
  "Bandits",
  "Dungeon",
  "Laborotory",
  "Mind Control",
  "Powerful Artifact",
  "Natural Resources",
  "Mysterious Disease",
  "Declining Population"
];


function Planet() {
  this.sourceImage = new Image();
  this.sourceImage.src = "assets/PixelPlanets.png";
  this.nativeSize = 32;
  this.width = 6;
  this.earthAlikes = 0;
  this.jungle = 1;
  this.rock = 2;
  this.ocean = 3;
  this.desert = 4;
  this.ice = 5;
  this.gas = 6;
  this.inferno = 7;
  this.toxic = 8;
  this.darkGiant = 9;
  this.balls = 10;
  this.imageIndex = getRandomInt(0,5);

  this.size = 0;
  this.temperature = 0;
  this.atmosphere = 0;
  this.biosphere = 0;

  this.population = 0;
  this.tech_level = 0;
  this.tag_1 = 0;
  this.tag_2 = 0;
  this.notes = "";
  this.factions = [];

  //this.position = new Vector();
  //In days
  this.orbitalPeriod = 365;
  this.orbitalDistance = 50;
  this.orbitalAngle = 0;
  this.orbitAnchorX = 0;
  this.orbitAnchorY = 0;
  this.typeIndex = getRandomInt(0, 9);

  this.name = "";
}

Planet.prototype.draw = function(ctx) {
  //var radius = Math.sqrt(Math.pow(this.x - this.orbitAnchorX,2) + Math.pow(this.y - this.orbitAnchorY,2));
  ctx.beginPath();
  ctx.arc(this.orbitAnchorX, this.orbitAnchorY, this.orbitalDistance, 0, 2 * Math.PI, false);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(128, 128,128, 0.3)";
  ctx.stroke();
  ctx.closePath();

  ctx.drawImage(this.sourceImage,
                this.imageIndex * 32,
                this.typeIndex * 32,
                32,
                32,
                this.x - 16,
                this.y - 16,
                32,
                32);

  ctx.font = 'Orbitron, 18pt sans-serif';
  var metrics = {};
  metrics.width = 5 * this.name.length;
  metrics.height = 9;

  ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
  ctx.fillRect(this.x - (metrics.width/2) - 2, this.y + 18, metrics.width + 4, metrics.height + 4);
  ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
  ctx.fillText(this.name, this.x - (metrics.width/2), this.y + 20 + metrics.height);
}

Planet.prototype.drawIcon = function(ctx)
{
  ctx.beginPath();
  ctx.arc(this.orbitAnchorX, this.orbitAnchorY, 2, 0, 2 * Math.PI, false);
  ctx.lineWidth = 16;
  ctx.strokeStyle = "rgba(128, 128,128, 0.3)";
  ctx.stroke();
  ctx.closePath();

  ctx.drawImage(this.sourceImage,
                this.imageIndex * 32,
                this.typeIndex * 32,
                32,
                32,
                this.x - 16,
                this.y - 16,
                32,
                32);
}

Planet.prototype.place = function(star, distance) {
  // Randomize starting angle
  this.orbitalAngle = getRandom(0, Math.PI*2);
  this.x = star.x + (distance * Math.cos(this.orbitalAngle));
  this.y = star.y + (distance * Math.sin(this.orbitalAngle));
  this.orbitalDistance = distance;
  this.orbitAnchorY = star.y;
  this.orbitAnchorX = star.x;
  this.orbitalPeriod = 16 + this.orbitalDistance + getRandomInt(0, 320);
}

Planet.prototype.anchor = function(star) {
  this.orbitAnchorY = star.y;
  this.orbitAnchorX = star.x;
  this.x = star.x + (this.orbitalDistance * Math.cos(this.orbitalAngle));
  this.y = star.y + (this.orbitalDistance * Math.sin(this.orbitalAngle));
}

Planet.prototype.advance = function(days) {
  var advancement = (days / this.orbitalPeriod) * Math.PI * 2;
  this.orbitalAngle = (this.orbitalAngle + advancement);
  this.x = this.orbitAnchorX + (this.orbitalDistance * Math.cos(this.orbitalAngle));
  this.y = this.orbitAnchorY + (this.orbitalDistance * Math.sin(this.orbitalAngle));
}

Planet.prototype.click = function(x, y) {
  if ((x >= this.x-16) &&
      (x <= this.x + 16) &&
      (y >= this.y-16) &&
      (y <= this.y + 16)) {
    // Load the infotab
   loadInfotab(this);
    return true;
  }
  return false;
}

Planet.prototype.update = function(data) {
  for(var property in data) {
    if (this.hasOwnProperty(property)) {
      this[property] = data[property];
    }
  }

  if (this.atmosphere > 4 && this.atmosphere < 10) {
    //Any
    if (this.temperature == 2) {
      this.typeIndex = this.ice;
    }
    else if (this.temperature == 3) {
      this.typeIndex = this.earthAlikes;
    }
    else if (this.temperature == 4 || this.temperature == 5) {
      this.typeIndex = this.ice;
    }
    else if (this.temperature > 5 || this.temperature < 9) {
      var roll = getRandomInt(0, 2);
      if (roll == 0) {
        this.typeIndex = this.earthAlikes;
      } else if (roll == 1) {
        this.typeIndex = this.jungle;
      } else {
        this.typeIndex = this.ocean;
      }
    }
    else if (this.temperature > 8 && this.temperature < 12) {
      this.typeIndex = this.desert;
    } else {
      var roll = getRandomInt(0,1);
      if (roll == 0) {
        this.typeIndex = this.inferno;
      } else {
        this.typeIndex = this.rock;
      }
    }
  } else if (this.atmosphere == 2 || this.atmosphere > 10) {
    this.typeIndex = this.toxic;
  } else if (this.atmosphere == 10) {
    var roll = getRandomInt(0,1);
    if (roll == 0) {
      this.typeIndex = this.darkGiant;
    } else {
      this.typeIndex = this.gas;
    }
  } else if (this.atmosphere == 4) {
    this.typeIndex = this.rock;
  } else {
    this.typeIndex = getRandomInt(0, 9);
  }
}

Planet.prototype.loadFrom = function(tree) {
  this.nativeSize = tree["nativeSize"];

  this.imageIndex = tree["imageIndex"] //0-5

  this.size = tree["size"];
  this.temperature = tree["temperature"];
  this.atmosphere = tree["atmosphere"];
  this.biosphere = tree["biosphere"];

  this.population = tree["population"];
  this.tech_level = tree["tech_level"];
  this.tag_1 = tree["tag_1"];
  this.tag_2 = tree["tag_2"];
  this.notes = tree["notes"];
  this.factions = tree["factions"];

  //this.position = new Vector();
  //In days
  this.orbitalPeriod = tree["orbitalPeriod"];
  this.orbitalDistance = tree["orbitalDistance"];
  this.orbitalAngle = tree["orbitalAngle"];
  this.orbitAnchorX = tree["orbitAnchorX"];
  this.orbitAnchorY = tree["orbitAnchorY"];
  this.typeIndex = tree["typeIndex"];

  this.name = tree["name"];
}

Planet.prototype.generateProperties = function() {
  this.size = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.atmosphere = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.temperature = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.biosphere = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.population = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.tech_level = getRandomInt(1, 6) + getRandomInt(1, 6);
  this.tag_1 = this.tag_2 = getRandomInt(0, world_tags.length);
  while(this.tag_2 == this.tag_1) {
    this.tag_2 = getRandomInt(0, world_tags.length);
  }
}

function getSizeString(size) {
  if (typeof size != 'number')
  {
    return "?";
  }
  if (size < 3) // 2
  {
    return "Tiny";
  } else if (size < 5) { // 3-4
    return "Small";
  } else if (size < 8) { // 5-7
    return "Average";
  } else if (size < 10) { // 8-9
    return "Large";
  } else if (size < 11) { // 10
    return "Giant";
  } else if (size < 12) { // 11
    return "Super Giant";
  } else {
    return "Ultra Giant";
  }
}

function getAtmosphereString(atmosphere) {
  if (typeof atmosphere != 'number')
  {
    return "?";
  }
  if (atmosphere < 3) {
    return "Corrosive";
  } else if (atmosphere < 4) {
    return "Inert Gas";
  } else if (atmosphere < 5) {
    return "Airless or thin atmosphere";
  } else if (atmosphere < 10) {
    return "Breathable mix";
  } else if (atmosphere < 11) {
    return "Thick atmosphere, (use pressure mask)";
  } else {
    return "Corrosive and invasive atmosphere";
  }
}

function getTemperatureString(temperature) {
  if (typeof temperature != 'number')
  {
    return "?";
  }
  if (temperature < 3) {
    return "Frozen";
  } else if (temperature < 4) {
    return "Variable cold-to-temperate";
  } else if (temperature < 6) {
    return "Cold";
  } else if (temperature < 9) {
    return "Temperate";
  } else if (temperature < 11) {
    return "Warm";
  } else if (temperature < 12) {
    return "Variable temperate-to-warm";
  } else {
    return "Burning";
  }
}

function getBiosphereString(biosphere) {
  if (typeof biosphere != 'number')
  {
    return "?";
  }
  if (biosphere < 3) {
    return "Biosphere remnants";
  } else if (biosphere < 4) {
    return "Microbial Life";
  } else if (biosphere < 6) {
    return "No native biosphere";
  } else if (biosphere < 9) {
    return "Human-miscible biosphere";
  } else if (biosphere < 11) {
    return "Immiscible biosphere";
  } else if (biosphere < 12) {
    return "Hybrid biosphere";
  } else {
    return "Engineered biosphere";
  }
}

function getPopulationString(population) {
  if (typeof population != 'number')
  {
    return "?";
  }
  if (population < 3) {
    return "Failed colony";
  } else if (population < 4) {
    return "Outpost";
  } else if (population < 6) {
    return "Tens of thousands";
  } else if (population < 9) {
    return "Hundreds of thousands";
  } else if (population < 11) {
    return "Millions";
  } else if (population < 12) {
    return "Billions";
  } else {
    return "Alien Civilization";
  }
}

function getTechLevelString(tech_level) {
  if (typeof tech_level != 'number')
  {
    return "?";
  }
  if (tech_level < 3) {
    return "TL0 - Stone-age technology";
  } else if (tech_level < 4) {
    return "TL1 - Medieval technology";
  } else if (tech_level < 5) {
    return "TL2 - Nineteenth-century technology";
  } else if (tech_level < 7) {
    return "TL3 - Twentieth-century technology";
  } else if (tech_level < 11) {
    return "TL4 - Baseline postech";
  } else if (tech_level < 12) {
    return "TL4+ - Speciality or surviving pretech";
  } else {
    return "TL5 - Pretech";
  }
}

function getTagString(tag) {
  if (typeof tag != 'number' || tag >= world_tags.length)
  {
    return "?";
  }
  return world_tags[tag];
}
