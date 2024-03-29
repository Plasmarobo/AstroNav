// Sectors.js
var globalSector;
var currentSystem;

function StellarSector(canvasId) {
  this.starIcon = new Image();
  this.starIcon.src = "assets/star00icon.png";

  this.sectorWidth = 11;
  this.sectorHeight = 10;

  this.canvasId = canvasId;
  this.cellScale = 1; // Multiplier on cell size
  this.cellMargin = 0.1; // Adds to Width/Height calc
  this.background = new Image();

  var sector = this;

  this.systemGrid = new HexagonGrid(canvasId, this.cellSize, function(tile) {
    //alert("Clicked on " + tile.column + ", " + tile.row);
    currentSystem = sector.getSystem(tile.column, tile.row);
    currentSystem.draw(systemcontext);
    showSystemView();
    animationCallback = function(stepTime) {
      currentSystem.advance(1.0 * (stepTime/1000));
      currentSystem.draw(systemcontext);
    }
  });

  this.systems = {};

  this.background.onload = function () {
    sector.draw();
  }

  this.background.src = "assets/galaxy.png";

  this.systemNames = new NameGenerator(12);

  this.year = 3200;
  this.day = 0;
}

StellarSector.prototype.hasSystem = function(x, y) {
  return this.systems.hasOwnProperty(x + "," + y);
}

StellarSector.prototype.getSystem = function(x, y) {
  if (!this.hasSystem(x, y)) {
    this.clearSystem(x,y);
  }

  return this.systems[x + "," + y];
}

StellarSector.prototype.advance = function(days) {
  this.day += days;
  if (day > 365) {
    this.year += this.day/365;
    this.day = this.day % 365;
  }
  for(var system in this.systems) {
    system.advance(days);
  }
}

StellarSector.prototype.draw = function() {
  var context = document.getElementById(this.canvasId).getContext('2d');
  context.clearRect(0,0, context.width, context.height);

  var dimensionLimit = Math.min(sectorcanvas.width / (this.sectorWidth + (2 * this.cellMargin)), sectorcanvas.height / (this.sectorHeight + (2 * this.cellMargin))) / 2;
  var cellRadius = this.cellScale * dimensionLimit;
  this.systemGrid.updateRadius(cellRadius);

  var backgroundX = (sectorcanvas.width/2) - (this.background.width/2);
  var backgroundY = (sectorcanvas.height/2) - (this.background.height/2);
  var left_padding = (sectorcanvas.width/2) - (this.systemGrid.getWidth(this.sectorWidth)/2);
  var top_padding = (sectorcanvas.height/2) - (this.systemGrid.getHeight(this.sectorHeight)/2);
  this.systemGrid.updateOffset(left_padding, top_padding);
  context.drawImage(this.background, backgroundX,backgroundY);

  for(var system in this.systems) {
    system = this.systems[system];
    if (system.name != "Deep Space") {
      this.systemGrid.drawAt(system.x, system.y, system.getIcon(), dimensionLimit);
      this.systemGrid.labelAt(system.x, system.y, 0, this.starIcon.height, system.name, dimensionLimit);
    }
  }

  this.systemGrid.drawHexGrid(this.sectorHeight,
                              this.sectorWidth,
                              true);
}

StellarSector.prototype.newSystem = function(x, y, name) {
  var system = this.getSystem(x, y);
  system.name = name;
  this.setSystem(x, y, system);
  this.draw();
}

StellarSector.prototype.setSystem = function(x, y, system) {
  this.systems[x + "," + y] = system;
  this.draw();
}

StellarSector.prototype.updateSystem = function(x, y, info) {
  var system = this.getsystem(x, y);
  for(var property in info) {
    if (system.hasOwnProperty(property)) {
      system[property] = info[property];
    }
  }
  this.setSystem(x, y, system);
  this.draw();
}

StellarSector.prototype.clearSystem = function(x, y) {
  var newsys = new StellarSystem();
  newsys.x = x;
  newsys.y = y;
  this.setSystem(x, y, newsys);
  this.draw();
}

StellarSector.prototype.loadFrom = function(json) {
  // Deconstruct the object
  var tree = JSON.parse(json);
  this.sectorWidth = tree["sectorWidth"];
  this.sectorHeight = tree["sectorHeight"];
  this.cellSize = tree["cellSize"];
  this.systems = {};
  for(var system_coordinate in tree["systems"]) {
    var sys = new StellarSystem();
    sys.loadFrom(tree["systems"][system_coordinate]);
    this.systems[system_coordinate] = sys;
  }
  this.year = tree["year"];
  this.day = tree["day"];

  this.systemGrid = new HexagonGrid(this.canvasId, this.cellSize, function(tile) {
    if (this.sectorcanvas.display != "none")
    {
      currentSystem = sector.getSystem(tile.column, tile.row);
      currentSystem.draw(systemcontext);
      showSystemView();
      animationCallback = function(stepTime) {
        currentSystem.advance(1.0 * (stepTime/1000));
        currentSystem.draw(systemcontext);
      }
    }
  });

  this.systemNames.loadFrom(tree["systemNames"]);
  globalSector = this;
  globalSector.draw();
  showSectorView();
}

StellarSector.prototype.generateNew = function() {
  var system_count = 20 + getRandomInt(1, 10);
  while(system_count > 0)
  {
    var x = getRandomInt(0, this.sectorWidth-1);
    var y = getRandomInt(0, this.sectorHeight-1);
    console.log("Placing system " + x + ", " + y);
    if (!this.hasSystem(x, y))
    {
      console.log("Success");
      this.newSystem(x, y, "Sector " + x + "-" + y);
      system_count -= 1;
    }
  }
}
