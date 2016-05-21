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
  this.imageIndex = Math.getRandomInt(0,6); //0-5

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

  this.name = "";
}

Planet.prototype.draw = function(ctx) {
  var typeIndex;
  if (this.atmosphere > 4 && this.atmosphere < 10) {
    //Any
    if (this.temperature == 2) {
      typeIndex = this.ice;
    }
    else if (this.temperature == 3) {
      typeIndex = this.earthAlikes;
    }
    else if (this.temperature == 4 || this.temperature == 5) {
      typeIndex = this.ice;
    }
    else if (this.temperature > 5 || this.temperature < 9) {
      var roll = getRandomInt(0, 3);
      if (roll == 0) {
        typeIndex = this.earthAlikes;
      } else if (roll == 1) {
        typeIndex = this.jungle;
      } else {
        typeIndex = this.ocean;
      }
    }
    else if (this.temperature > 8 && this.temperature < 12) {
      typeIndex = this.desert;
    } else {
      var roll = Math.getRandomInt(0,2);
      if (roll == 0) {
        typeIndex = this.inferno;
      } else {
        typeIndex = this.rock;
      }
    }
  } else if (this.atmosphere == 2 || this.atmosphere > 10) {
    typeIndex = this.toxic;
  } else if (this.atmosphere == 10) {
    var roll = getRandomInt(0,2);
    if (roll == 0) {
      typeIndex = this.darkGiant;
    } else {
      typeIndex = this.gas;
    }
  } else if (this.atmosphere == 4) {
    typeIndex = this.rock;
  } else {
    typeIndex = ths.balls;
  }

  ctx.drawImage(this.sourceImage,
                this.imageIndex * 32,
                typeIndex * 32,
                32,
                32,
                this.x,
                this.y,
                32,
                32);
}

Planet.prototype.place = function(star, distance) {
  // Randomize starting angle
  this.orbitalAngle = getRandom(0, Math.PI*2);
  this.x = star.x + (distance * Math.cos(rad));
  this.y = star.y + (distance * Math.sin(rad));
  this.orbitalDistance = distance;
  this.orbitAnchorY = star.y;
  this.orbitAnchorX = star.x;
}

Planet.prototype.advance = function(days) {
  var advancement = (days / this.orbitalPeriod) * Math.PI * 2;
  this.orbitalAngle = (this.orbitalAngle + advancement);
  this.x = this.orbitAnchorX + (this.orbitalDistance * Math.cos(rad));
  this.y = this.orbitAnchorY + (this.orbitalDistance * Math.sin(rad));
}
