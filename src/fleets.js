// fleets.js
function Fleet() {
  this.name = "";
  this.faction = "";
  
  this.homeSectorX = 0;
  this.homeSectorY = 0;

  this.destSectorX = 0;
  this.destSectorY = 0;

  this.ships = [];
  this.type = "Trade"; //By default, could also be Combat, Exploration, Justice, Piracy, Smuggler
}

Fleet.prototype.addCargo = function(cargo) {

}

function Ship() {
  this.name = "";
  this.hullClass = 0; //Fighter
  this.weaponPower = 0;
  this.armorPower = 0;
  this.speed = 0;
  this.maxFuel = 0;
  this.currentFuel = 0;
  this.cargo = [];
  this.maxCargo = 1;
}
