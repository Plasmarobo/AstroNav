function DrawStarfield(ctx, width, height, count) {
  var minStarBrightness = 205;
  var star = 
  {
  size: 1,
  position: {x: 0, y: 0},
  color: [255,255,255],
  flux: 0
  };
  for(var i = 0; i < count; ++i) {
    star.position.x = Math.floor(Math.random()*width);
    star.position.y = Math.floor(Math.random()*height);
    star.color[0] = Math.ceil(Math.random()*(255-minStarBrightness))+minStarBrightness;
    star.color[1] = Math.ceil(Math.random()*(255-minStarBrightness))+minStarBrightness;
    star.color[2] = Math.ceil(Math.random()*(255-minStarBrightness))+minStarBrightness;
    star.flux = Math.floor(Math.random()*0.7)+0.2;
    ctx.fillStyle = "rgba(" + star.color[0] + "," + star.color[1] + "," + star.color[2] + "," + star.flux + ")";
    ctx.beginPath();
    ctx.arc(star.position.x, star.position.y, star.size, 0, 2*Math.PI);
    ctx.fill();  
  }
}