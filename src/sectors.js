// Sectors.js
var globalSector;
var currentSystem;

function StellarSector(canvasId) {
  this.starIcon = new Image();
  this.starIcon.src = "assets/sector_star.png";

  this.context = document.getElementById(canvasId).getContext('2d');

  this.sectorWidth = 11;
  this.sectorHeight = 10;
  this.padding = 50;
  this.cellSize = 50;
  this.background = new Image();

  var sector = this;

  this.systemGrid = new HexagonGrid(canvasId, this.cellSize, function(tile) {
    //alert("Clicked on " + tile.column + ", " + tile.row);
    currentSystem = sector.getSystem(tile.column, tile.row);
    currentSystem.draw(systemcontext);
    showSystemView();
  });

  this.systems = {};
  
  this.background.onload = function () {
    sector.draw();
  }

  this.background.src = "assets/background.png";

  this.systemNames = new NameGenerator(12);

}

StellarSector.prototype.getSystem = function(x, y) {
  if (!(this.systems.hasOwnProperty(x + "," + y))) {
    this.clearSystem(x,y);
  }

  return this.systems[x + "," + y];
}

StellarSector.prototype.advance = function(days) {
  for(var system in this.systems) {
    system.advance(days);
  }
}

StellarSector.prototype.draw = function() {
  this.context.drawImage(this.background, 0,0);
  for(var system in this.systems) {
    system = this.systems[system];
    if (system.name != "Deep Space") {
      this.systemGrid.drawAt(system.x, system.y, this.starIcon);
    }
  }

  this.systemGrid.drawHexGrid(this.sectorHeight,
                              this.sectorWidth,
                              this.padding,
                              this.padding,
                              true);
}

StellarSector.prototype.newSystem = function(x, y, name) {
  var system = this.getSystem(x, y);
  system.type = name;
  this.setSystem(x, y, system);
  this.draw();
}

StellarSector.prototype.setSystem = function(x, y, star) {
  this.systems[x + "," + y] = star;
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
