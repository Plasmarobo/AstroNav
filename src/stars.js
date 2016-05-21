function Star() {
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.image = new Image();
  this.image.src = "assets/star.png";
  this.scale = 1;
  this.temperature = 20;
}

Star.prototype.draw = function(ctx) {
  var x = ctx.canvas.clientWidth/2;
  var y = ctx.canvas.clientWidth/2;
  ctx.drawImage(this.image, x - (this.image.width/2), y - (this.image.height/2)); 
}