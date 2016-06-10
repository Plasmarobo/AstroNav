function Star() {
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.image = new Image();
  this.image.src = "assets/star.png";
  this.scale = 1;
  this.temperature = 20;
}

Star.prototype.anchor = function(ctx) {
  this.x = ctx.canvas.width/2;
  this.y = ctx.canvas.height/2;
}

Star.prototype.draw = function(ctx) {
  this.anchor(ctx);
  ctx.drawImage(this.image, this.x - (this.image.width/2), this.y - (this.image.height/2)); 
}

Star.prototype.click = function(x, y) {
  if ((x >= (this.x - (this.image.width/2))) &&
      (x <= (this.x + (this.image.width/2))) &&
      (y >= (this.y - (this.image.height/2))) &&
      (y <= (this.y + (this.image.height/2)))) {
    document.getElementById("infotab_title").value = currentSystem.name;
    document.getElementById("infotab_size").value = this.size;
    document.getElementById("infotab_temperature").value = this.temperature;
    document.getElementById("infotab_atmosphere").value = "N/A";
    document.getElementById("infotab_biosphere").value = "N/A";
    document.getElementById("infotab_techlevel").value = "N/A";
    document.getElementById("infotab_population").value = "N/A";
    document.getElementById("infotab_factions").value = "N/A";
    document.getElementById("infotab_tag1").value = "N/A";
    document.getElementById("infotab_tag2").value = "N/A";
    document.getElementById("infotab_notes").value = "";
    infotabTarget = this;
    return true;
  }
  return false;
}

Star.prototype.loadFrom = function(tree) {
  this.x = tree["x"];
  this.y = tree["y"];
  this.size = tree["size"];
  this.scale = tree["scale"];
  this.temperature = tree["temperature"];
}