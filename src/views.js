// Views.js
var systemcanvas;
var sectorcanvas;
var systemcontext;
var sectorcontext;
var returnButton;
var currentSystem = null;
var globalSector = null;
var infotabTarget = null;
var infotab;
var globalWidth;
var globalHeight;
var animationCallback = null;

var sizingParameters = {
  "minViewport" : 530,
  "infotab" : 220,
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

  // handle event
  window.addEventListener("optimizedResize", function() {
      onResize();
  });

  globalSector = new StellarSector("SectorCanvas");

  initializeEngine();

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

var resizeThrottle = null;

function onResize() {
  if (resizeThrottle != null) {
    clearTimeout(resizeThrottle);
  }
  resizeThrottle = setTimeout(function() {
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
      currentSystem.draw(systemcontext);
    }
  },100);
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

function updateInfotabTooltips(targe) {
  document.getElementById("infotab_size_tooltip").innerHTML = getSizeString(parseInt(document.getElementById("infotab_size").value));
  document.getElementById("infotab_temperature_tooltip").innerHTML = getTemperatureString(parseInt(document.getElementById("infotab_temperature").value));
  document.getElementById("infotab_atmosphere_tooltip").innerHTML = getAtmosphereString(parseInt(document.getElementById("infotab_atmosphere").value));
  document.getElementById("infotab_biosphere_tooltip").innerHTML = getBiosphereString(parseInt(document.getElementById("infotab_biosphere").value));
  document.getElementById("infotab_techlevel_tooltip").innerHTML = getTechLevelString(parseInt(document.getElementById("infotab_techlevel").value));
  document.getElementById("infotab_population_tooltip").innerHTML = getPopulationString(parseInt(document.getElementById("infotab_population").value));
  document.getElementById("infotab_tag1_tooltip").innerHTML = getTagString(parseInt(document.getElementById("infotab_tag1").value));
  document.getElementById("infotab_tag2_tooltip").innerHTML = getTagString(parseInt(document.getElementById("infotab_tag2").value));
}

function loadInfotab(target) {
  infotabTarget = target;
  document.getElementById("infotab_title").value = target.hasOwnProperty("name") ? target.name : "N/A";

  if (target.hasOwnProperty("size")) {
    document.getElementById("infotab_size").value =  target.size;
  } else {
    document.getElementById("infotab_size").value = "N/A";
  }

  if (target.hasOwnProperty("temperature")) {
    document.getElementById("infotab_temperature").value = target.temperature;
  } else {
    document.getElementById("infotab_temperature").value = "N/A";
  }

  if (target.hasOwnProperty("atmosphere")) {
    document.getElementById("infotab_atmosphere").value = target.atmosphere;
  } else {
    document.getElementById("infotab_atmosphere").value = "N/A";
  }

  if (target.hasOwnProperty("biosphere")) {
    document.getElementById("infotab_biosphere").value = target.biosphere;
  } else {
    document.getElementById("infotab_biosphere").value = "N/A";
  }

  if (target.hasOwnProperty("tech_level")) {
    document.getElementById("infotab_techlevel").value = target.tech_level;
  } else {
    document.getElementById("infotab_techlevel").value = "N/A";
  }

  if (target.hasOwnProperty("population")) {
    document.getElementById("infotab_population").value = target.population;
  } else {
    document.getElementById("infotab_population").value = "N/A";
  }

  document.getElementById("infotab_factions").value = "";
  if (target.hasOwnProperty("factions")) {
    for(var faction in this.factions) {
      document.getElementById("infotab_factions").value += faction + ",";
    }
  } else {
    document.getElementById("infotab_factions").value = "N/A";
  }

  if (target.hasOwnProperty("tag_1")) {
    document.getElementById("infotab_tag1").value = target.tag_1;
  } else {
    document.getElementById("infotab_tag1").value = "N/A";
  }

  if (target.hasOwnProperty("tag_2")) {
    document.getElementById("infotab_tag2").value = target.tag_2;
  } else {
    document.getElementById("infotab_tag2").value = "N/A";
  }
  document.getElementById("infotab_notes").value = target.hasOwnProperty("notes") ? target.notes : "N/A";
  updateInfotabTooltips();
}

function saveInfotab() {
  var data = {};
  data["name"] = document.getElementById("infotab_title").value;
  data["size"] = document.getElementById("infotab_size").value;
  data["temperature"] = document.getElementById("infotab_temperature").value;
  data["atmosphere"] = document.getElementById("infotab_atmosphere").value;
  data["biosphere"] = document.getElementById("infotab_biosphere").value;
  data["tech_level"] = document.getElementById("infotab_techlevel").value;
  data["population"] = document.getElementById("infotab_population").value;
  data["factions"] = document.getElementById("infotab_factions").value;
  data["tag_1"] = document.getElementById("infotab_tag1").value;
  data["tag_2"] = document.getElementById("infotab_tag2").value;
  data["notes"] = document.getElementById("infotab_notes").value;
  infotabTarget.update(data);
}