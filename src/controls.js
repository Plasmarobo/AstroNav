// controls.js
function enableControls() {
  document.getElementById("return_button").addEventListener("click", function(){
    currentSystem = null;
    infotabTarget = null;
    document.getElementById("infotab_title").value = "No Target";
    globalSector.draw();
    showSectorView();
    animationCallback = null;
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
          globalSector.newSystem(currentSystem.x, currentSystem.y, data["dialog_name"]);
          currentSystem = globalSector.getSystem(currentSystem.x, currentSystem.y);
          currentSystem.draw(systemcontext);
        }
      }
    };
    dialog.show();
  });
  document.getElementById("clear_button").addEventListener("click", function(){
    var dialog = new Dialog();
    dialog.addTitle("Really Delete " + currentSystem.name + "?");
    dialog.addSection();
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
    dialog.addTitle("New Planets");
    dialog.addSection();
    dialog.addField("count", "Count");
    dialog.addSubmit();
    dialog.onResult = function(success, data) {
      if (success && data.hasOwnProperty("count")) {
        var names = globalSector.systemNames.getPlanetNames(currentSystem.name);
        for(var i = 0; i < parseInt(data["count"]); ++i) {
          currentSystem.newPlanet(names[i]);
        }
      }
    };
    dialog.show();
  });
  document.getElementById("clear_planet_button").addEventListener("click", function() {
    var dialog = new Dialog();
    dialog.addTitle("Clear Planets?");
    dialog.addSection();
    dialog.addYesNo();
    dialog.onResult = function(success) {
      if (success) {
        currentSystem.clearPlanets();
      }
    }
  });
  document.getElementById("infotab_commit").addEventListener("click", function() {
    var dialog = new Dialog();
    dialog.addTitle("Really Commit?");
    dialog.addSection();
    dialog.addYesNo();
    dialog.onResult = function(success) {
      if (success) {
        // Scan infotab and updates
        saveInfotab();
      }
    }
    dialog.show();
  });
  document.getElementById("infotab_discard").addEventListener("click", function() {
    var dialog = new Dialog();
    dialog.addTitle("Toss Changes?");
    dialog.addSection();
    dialog.addYesNo();
    dialog.onResult = function(success) {
      if (success) {
        loadInfotab(infotabTarget);
      }
    }
    dialog.show();
  });
  document.getElementById("info_button").addEventListener("click", function() {
    // Show/hide infotab
    if (infotab.style.display == "block") {
      infotab.style.display = "none";
      hide_infotab.style.display = "block";
    } else {
      infotab.style.display = "block";
      hide_infotab.style.display = "none";
    }
  });
  document.getElementById("save_button").addEventListener("click", function() {
    saveJSON("sector", getSectorJSON(globalSector));
  });
  document.getElementById("load_button").addEventListener("click", function() {
    globalSector.loadFrom(loadJSON("sector"));
    showSectorView();
  });
  document.getElementById("export_button").addEventListener("click", function() {
    exportJSON(globalSector);
  });
  document.getElementById("infotab_edit_notes").addEventListener("click", function() {
    var dialog = new Dialog();
    dialog.addTitle("Edit Notes");
    dialog.addSection();
    dialog.addTextArea("target_notes", 20, infotabTarget.notes);
    dialog.addSubmit();
    dialog.onResult = function(success, data) {
      if (success) {
        document.getElementById("infotab_notes").value = document.getElementById("target_notes").value;
      }
    }
    dialog.show();
  })
}
