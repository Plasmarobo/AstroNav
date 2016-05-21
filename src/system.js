// System.js
function StellarSystem() {
  this.name = "Deep Space";
  this.planets = [];
  this.others = [];
  this.star = new Star(); 
  this.starSize = 256;
  this.x = 0;
  this.y = 0;
}

StellarSystem.prototype.draw = function(ctx) {
  //Draw the star first, assume a background is drawn
  if (this.name != "Deep Space") {
    this.star.draw(ctx);
  }
  for(var drawable in this.others) {
    drawable.draw(ctx);
  }
  for(var drawable in this.planets) {
    drawable.draw(ctx);
  }
}

StellarSystem.prototype.advance = function(days) {
  // If there is any inter-planetary sim to, do it
  for(var advancable in this.others) {
    advancable.advance(days);
  }

  for(var advancable in this.planets) {
    advancable.advance(days);
  }
  this.draw();
}

StellarSystem.prototype.newPlanet = function(name) {
  var planet = new Planet();

  planet.name = name;
  if (planet.length == 0) {
    planet.place(star, 96);
  } else {
    planet.place(star, this.planets[this.planets.length-1].orbitalDistance);
  }
  this.draw();
}

StellarSystem.prototype.deletePlanet = function(index) {
  this.planets.splice(index, 1);
  this.draw();
}

StellarSystem.prototype.updatePlanet = function(index, info) {
  for(var property in info) {
    if (this.planets[index].hasOwnProperty(property)) {
      this.planets[index][property] = info[property];
    }
  }
  this.draw();
}

StellarSystem.prototype.newOther = function(drawable) {
  this.others.push(drawable);
  this.draw();
}

StellarSystem.prototype.deleteOther = function(index) {
  this.others.splice(index, 1);
  this.draw();
}

StellarSystem.prototype.updateOther = function(index, info) {
  for(var property in info) {
    if (this.others[index].hasOwnProperty(property)) {
      this.others[index][property] = info[property];
    }
  }
  this.draw();
}