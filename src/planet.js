// Planet.js
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
  this.imageIndex = getRandomInt(0,6); //0-5

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
  this.typeIndex = getRandomInt(0, 10);

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
      var roll = getRandomInt(0, 3);
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
      var roll = getRandomInt(0,2);
      if (roll == 0) {
        this.typeIndex = this.inferno;
      } else {
        this.typeIndex = this.rock;
      }
    }
  } else if (this.atmosphere == 2 || this.atmosphere > 10) {
    this.typeIndex = this.toxic;
  } else if (this.atmosphere == 10) {
    var roll = getRandomInt(0,2);
    if (roll == 0) {
      this.typeIndex = this.darkGiant;
    } else {
      this.typeIndex = this.gas;
    }
  } else if (this.atmosphere == 4) {
    this.typeIndex = this.rock;
  } else {
    this.typeIndex = getRandomInt(0, 10);
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