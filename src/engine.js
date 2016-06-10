var engineStart = null;
var engineLastStep = null;
var resizing = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function initializeEngine() {
  engineLastStep = new Date().getTime();
  engineStep();  
}

function engineStep() {
  if (((document.body.scrollWidth != globalWidth) ||
      ((document.body.scrollHeight-1) != globalHeight)) &&
      (resizeThrottle == null))
  {
    window.dispatchEvent(new CustomEvent("optimizedResize"));
  }
  if (!engineStart) engineStart = engineLastStep;
  var now = new Date().getTime();
  var stepTime = now - engineLastStep;
  engineLastStep = now;
  if (animationCallback != null) {
    animationCallback(stepTime);
  }
  window.requestAnimationFrame(engineStep);
}