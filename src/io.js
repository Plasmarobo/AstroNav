//io.js 

function getSectorJSON(sector) {
  return JSON.stringify(sector, null, 2);
}

function saveJSON(key, value) {
  if (localStorage === void(0)) {
    alert("Saving not supported on your browser");
  } else {
    localStorage.setItem(key, value);
  }
}

function loadJSON(key) {
  return localStorage.getItem(key);
}

function exportJSON(sector) {
  var json = getSectorJSON(sector);
  var tab = window.open();
  tab.document.open();
  tab.document.write("<html><body><pre>" + json + "</pre></body></html>");
  tab.document.close();
}
