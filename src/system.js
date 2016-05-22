// System.js
function StellarSystem() {
  this.name = "Deep Space";
  this.planets = [];
  this.others = [];
  this.star = new Star();
  this.x = 0;
  this.y = 0;
}

StellarSystem.prototype.draw = function(ctx) {
  //Draw the star first, assume a background is drawn
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (this.name != "Deep Space") {
    this.star.draw(ctx);
  }
  for(var drawable in this.others) {
    drawable = this.others[drawable];
    drawable.draw(ctx);
  }
  for(var drawable in this.planets) {
    drawable = this.planets[drawable];
    drawable.draw(ctx);
  }
}

StellarSystem.prototype.advance = function(days) {
  // If there is any inter-planetary sim to, do it
  for(var advancable in this.others) {
    advancable = this.others[advancable];
    advancable.advance(days);
  }

  for(var advancable in this.planets) {
    advancable = this.planets[advancable];
    advancable.advance(days);
  }
  this.draw(systemcontext);
}

StellarSystem.prototype.setName = function(name) {
  this.name = name;
}

StellarSystem.prototype.newPlanet = function(name) {
  var planet = new Planet();

  planet.name = name;
  if (this.planets.length == 0) {
    planet.place(this.star, 96 + getRandomInt(0, 16));
  } else {
    planet.place(this.star, this.planets[this.planets.length-1].orbitalDistance+32 + getRandomInt(0, 16));
  }
  this.planets.push(planet);
  this.draw(systemcontext);
}

StellarSystem.prototype.deletePlanet = function(index) {
  this.planets.splice(index, 1);
  this.draw(systemcontext);
}

StellarSystem.prototype.updatePlanet = function(index, info) {
  for(var property in info) {
    if (this.planets[index].hasOwnProperty(property)) {
      this.planets[index][property] = info[property];
    }
  }
  this.draw(systemcontext);
}

StellarSystem.prototype.clearPlanets = function() {
  this.planets = [];
}

StellarSystem.prototype.newOther = function(drawable) {
  this.others.push(drawable);
  this.draw(systemcontext);
}

StellarSystem.prototype.deleteOther = function(index) {
  this.others.splice(index, 1);
  this.draw(systemcontext);
}

StellarSystem.prototype.updateOther = function(index, info) {
  for(var property in info) {
    if (this.others[index].hasOwnProperty(property)) {
      this.others[index][property] = info[property];
    }
  }
  this.draw(systemcontext);
}

StellarSystem.prototype.click = function(x, y) {
  // Check intersect with planets, others, star
  for(var planet in this.planets) {
    planet = this.planets[planet];
    if (planet.click(x, y)) {
      return;
    }
  }

  for(var other in this.others) {
    other = this.others[other];
    if (other.click(x, y)) {
      return;
    }
  }

  if (this.star.click(x, y)) {
    return;
  }
}

StellarSystem.prototype.loadFrom = function(tree) {
  this.name = tree["name"];
  this.planets = [];
  for (var planet in tree["planets"]) {
    var item = new Planet();
    item.loadFrom(tree["planets"][planet]);
    this.planets.push(item);
  }
  this.others = [];
  for (var other in tree["others"]) {
    var item = new Fixed();
    item.loadFrom(tree["others"][other]);
    this.others.push(item);
  }
  this.star.loadFrom(tree["star"]);
  this.starSize = 256;
  this.x = tree["x"];
  this.y = tree["y"];
}