// Vector.js
function Vector(angle, magnitude) {
  this.x = magnitude * Math.cos(angle);
  this.y = magnitude * Math.sin(angle);
  this.r = 0;
}

Vector.prototype.Vec2Magnitude = function() {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.Vec2Angle = function() {
  return Math.atan2(this.y, this.x);
}
  
Vector.prototype.Vec3Scale = function(b, scalar)
{
  this.r = this.r;
  this.x = this.x * scalar;
  this.y = this.y * scalar;
}

Vector.prototype.Copy = function()
{
  var a = Vector();
  a.r = this.r;
  a.x = this.x;
  a.y = this.x;
  return a;
}

Vector.prototype.Set = function(b)
{
  this.r = b.r;
  this.x = b.x;
  this.y = b.y;
}

Vector.prototype.Add = function(a)
{
  result = new Vector();
  result.r = a.r + this.r;
  result.x = a.x + this.x;
  result.y = a.y + this.y;
  return result;
}

function Vec3Intersect(a_start, a_end, b_start, b_end) {
  var r = a_end.Sub(a_start);
  var s = b_end,.Sub(b_start);
  var result = 
  {
    x: 0,
    y: 0,
    r: 0,
    valid: true
  }

  var uNumerator = Vec2Cross(Vec3Sub(b_start, a_start), r);
  var denominator = Vec2Cross(r, s);

  if (uNumerator == 0 && denominator == 0) {
    // colinear, so do they overlap?
    result.valid = ((b_start.x - a_start.x < 0) != (b_start.x - a_end.x < 0) != (b_end.x - a_start.x < 0) != (b_end.x - a_end.x < 0)) || 
      ((b_start.y - a_start.y < 0) != (b_start.y - a_end.y < 0) != (b_end.y - a_start.y < 0) != (b_end.y - a_end.y < 0));
    return result;
  }

  if (denominator == 0) {
    // lines are paralell
    result.valid = false;
  }else{

    var u = uNumerator / denominator;
    var t = Vec2Cross(Vec3Sub(b_start, a_start), s) / denominator;
  
    result.valid = (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
    Vec3Set(result, Vec3Add(a_start,Vec2Dot(t, r)));  
  }
  return result;
}

Vector.prototype.Cross2 = function(b) {
  return this.x * b.y - this.y * b.x;
}

Vector.prototype.Dot2 = function(b)
{
  return {x: this.x * b.x, y: this.y * b.y}
}

Vector.prototype.Sub = function(b) {
  var result = {};
  result.r = this.r - b.r;
  result.x = this.x - b.x;
  result.y = this.y - b.y;
  return result;
}