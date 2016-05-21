// Views.js
var systemcanvas;
var sectorcanvas;
var systemcontext;
var sectorcontext;
var returnButton;
var currentSystem = null;
var globalSector = null;
var infotab;

function initializeViews() {
  systemcanvas = document.getElementById("SystemCanvas");
  systemcontext = systemcanvas.getContext('2d');
  
  sectorcanvas = document.getElementById("SectorCanvas");
  sectorcontext = sectorcanvas.getContext('2d');

  sectorcontrols = document.getElementById("sector_controls");
  systemcontrols = document.getElementById("system_controls");

  infotab = document.getElementById("info_button");
  hide_infotab = document.getElementById("hide_info_button");

  document.getElementById("dialog").style.visibility = "hidden";

  globalSector = new StellarSector("SectorCanvas");

  showSectorView();
}

function showSectorView() {
  systemcontrols.style.visibility = "hidden";
  sectorcontrols.style.visibility = "visible";
  systemcanvas.style.visibility = "hidden";
  sectorcanvas.style.visibility = "visible";
  infotab.style.visibility = "hidden";
  hide_infotab.style.visibility = "hidden";
}

function showSystemView() {
  systemcontrols.style.visibility = "visible";
  sectorcontrols.style.visibility = "hidden";
  systemcanvas.style.visibility = "visible";
  sectorcanvas.style.visibility = "hidden";
  infotab.style.visibility = "visibility";
}