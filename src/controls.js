// controls.js
function enableControls() {
  document.getElementById("return_button").addEventListener("click", function(){
    globalSector.draw();
    showSectorView();
  });
  document.getElementById("new_button").addEventListener("click", function(){

    var systemname = globalSector.systemNames.getStarName();
    var dialog = new Dialog();
    dialog.addTitle("Sector Name");
    dialog.addSection();
    dialog.addField("dialog_name", ">", systemname);
    dialog.addSubmit();
    dialog.onResult = function(success, data) {
      if (data.hasOwnProperty("dialog_name")) {
        // Create and save a system
        if (currentSystem != null) {
          globalSector.newSystem(currentSystem.x, currentSystem.y, systemname);
        }
      }
    };
    dialog.show();
  });
  document.getElementById("clear_button").addEventListener("click", function(){
    var dialog = new Dialog();
    dialog.title = "Really Delete " + currentSystem.name + "?";
    dialog.addYesNo();
    dialog.onResult = function(success) {
      if (success) {
        globalSector.clearSystem(currentSystem.x, currentSystem.y);
      }
    };
    dialog.show();
  });
  document.getElementById("planet_button").addEventListener("click", function() {
    var dialog = new Dialog();
    dialog.title = "New Planets";
    dialog.addSection();
    dialog.addField("count", "Count");
    dialog.addSubmit();
    dialog.onResult = function(success, data) {
      if (success && data.hasOwnProperty("count")) {
        var names = globalSector.systemNames.getPlanetNames(currentSystem.name);
        for(var i = 0; i < parseInt(data["count"]); ++i) {
          var planet = new Planet();
          planet.name = names[i];
          currentSystem.newPlanet(planet);
        }
      }
    };
    dialog.show();
  });
  document.getElementById("info_button").addEventListener("click", function() {
    // Show/hide infotab
    if (infotab.style.visibility == "visible") {
      infotab.style.visibility = "hidden";
      hide_infotab.style.visibility = "visible";
    } else {
      infotab.style.visibility = "visible";
      hide_infotab.style.visibility = "hidden";
    }
  });
}
