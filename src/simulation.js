// Simulation.js

function Simulation() {
  this.editMode = false; // Edit vs simulation
  this.currentYear = 3200;
  this.currentDay = 0;

  //this.fleets = {};

}

Simulation.prototype.advance = function(days) {
  this.currentDay += days;
  if (this.currentDay > 364) {
    this.currentYear += 1;
    this.currentDay = currentDay % 365;
  }

  for (var system in this.systems) {
    system.advance(days);
  }
}