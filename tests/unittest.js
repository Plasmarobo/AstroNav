// UnitTest.js
var failed = 0;
var success = 0;
var total = 0;

function reportFailure(name, err) {
  total += 1;
  failed += 1;
  var failReport = document.createelement('div');
  failReport.className = 'failure';
  failReport.innerHtml = "Failure: " + name + ", Err: " + err;
  document.getElementById('results').appendChild(failReport);
}

function reportSuccess(name) {
  total += 1;
  success += 1;
  var successReport = document.createelement('div');
  successReport.className = 'success';
  successReport.innerHtml = "Success: " + name;
  document.getElementById('results').appendChild(successReport);
}

function test(name, callback) {
  var result = false;
  var error_msg;
  try {
    result = callback();
  } catch(err) {
    error_msg = err;
    result = false;
  }

  if (result == true) {
    reportSuccess(name);
  } else {
    reportFailure(name, error_msg);
  }
}

function testPlanet() {
  test("Creating Planet", function() {
    var planet = new Planet();
    return planet != null;
  });
  test("Place Planet", function() {
    var planet = new Planet();
    var star = {"x" : 0, "y" : 0};
    planet.place(star, 50);
    if (!(planet.x == 50))
      return false;
    if (!(planet.y == 0))
      return false;
    star.x = 25;
    star.y = 30;
    planet.place(star, 50);
    if (!(planet.x == 75))
      return false;
    if (!(planet.y == 30))
      return false;
    return true;
  });
  test("Advance Planet", function() {
    var planet = new Planet();
    var star = {"x" : 0, "y" : 0};
    planet.place(star, 50);
    planet.orbitalPeriod = 8;
    planet.orbitalAngle = 0;
    if (!(planet.x == 50))
      return false;
    if (!(planet.y == 0))
      return false;
    planet.advance(2);
    // We should be at 50 
  })
}