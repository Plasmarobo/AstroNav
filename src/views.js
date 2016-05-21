// Views.js
var systemcanvas;
var sectorcanvas;
var systemcontext;
var sectorcontext;
var returnButton;
var currentSystem = null;
var globalSector = null;
var infotab;
var globalWidth;
var globalHeight;

var sizingParameters = {
  "minViewport" : 530,
  "infotab" : 270,
}

function initializeViews() {
  systemcanvas = document.getElementById("SystemCanvas");
  systemcontext = systemcanvas.getContext('2d');
  
  sectorcanvas = document.getElementById("SectorCanvas");
  sectorcontext = sectorcanvas.getContext('2d');

  sectorcontrols = document.getElementById("sector_controls");
  systemcontrols = document.getElementById("system_controls");

  infotab = document.getElementById("info_button");
  hide_infotab = document.getElementById("hide_info_button");

  document.getElementById("dialog").style.display = "none";
  
  (function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                if ((document.body.scrollWidth != globalWidth) ||
                    (document.body.scrollHeight != globalHeight))
                {
                  obj.dispatchEvent(new CustomEvent(name));
                }
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
  })();

  // handle event
  window.addEventListener("optimizedResize", function() {
      onResize();
  });

  globalSector = new StellarSector("SectorCanvas");

  onResize();

  systemcanvas.addEventListener("click", function(e){
    var mouseX = e.pageX - systemcanvas.offsetLeft;
    var mouseY = e.pageY - systemcanvas.offsetTop;
    if (systemcanvas.style.display == "block") {
      if (currentSystem != null) {
        currentSystem.click(mouseX, mouseY);
      }
    }
  });

  showSectorView();
}

function showSectorView() {
  systemcontrols.style.display = "none";
  sectorcontrols.style.display = "block";
  systemcanvas.style.display = "none";
  sectorcanvas.style.display = "block";
  infotab.style.display = "none";
  hide_infotab.style.display = "none";
}

function showSystemView() {
  systemcontrols.style.display = "block";
  sectorcontrols.style.display = "none";
  systemcanvas.style.display = "block";
  sectorcanvas.style.display = "none";
  infotab.style.display = "block";
}

function onResize() {
  globalWidth = document.body.scrollWidth;
  globalHeight = document.body.scrollHeight-1;

  var width = globalWidth;
  var height = globalHeight;
  // Top bar is always fixed size
  height -= document.getElementById("control_bar").offsetHeight;
  height -= sizingParameters["infotab"];
  if (height < sizingParameters["minViewport"]) {
    height = sizingParameters["minViewport"];
  } 
  if (width < sizingParameters["minViewport"]) {
    width = sizingParameters["minViewport"];
  }

  setViewport(width, height);

  document.getElementById("infotab").style.height = sizingParameters["infotab"];
  
  globalSector.draw();
  if (currentSystem != null) {
    currentSystem.draw();
  }
}

function setViewport(width, height) {
  systemcanvas.style.height = height;
  systemcanvas.height = height;
  systemcanvas.style.width = width;
  systemcanvas.width = width;
  sectorcanvas.style.width = width;
  sectorcanvas.width = width;
  sectorcanvas.style.height = height;
  sectorcanvas.height = height;
  systemcontext = systemcanvas.getContext('2d');
  sectorcontext = sectorcanvas.getContext('2d');
  document.getElementById("map").style.height = height;
  document.getElementById("map").style.width = width;
}