// Names.js
function NameGenerator(count) {
  this.identified = 0;
  this.named = 1;
  this.xeno = 2;

  if (typeof count == 'undefined') {
    count = 200;
  }

  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var star_names = [ 
    "Cassius", "Crucis", "Leonis", "Tauri", "Corvus",
    "Cepheus", "Draco", "Beta-Cyria", "Omega-Tau", "Gemini",
    "Quaran", "Alpha Ophicus", "Asterope", "Asellus", "Bunda",
    "Chara", "Mercy", "Dabih", "Atlas", "Maia", "Naos", "Epsilon-A",
    "Hydra",  "Rastaban", "Regor", "Saiph", "Inferno", "Purgatory",
    "Paradise", "Vega", "Yed Prior", "Thabit", "Tejat", "Zosma",
    "Subra", "Ebonheart", "Fortune", "Ras Algethi", "Dragon",
    "Bovo", "Lyra", "Leverna", "Nintoku", "Valissian", "Subania", "Majora",
    "Geryon", "Drozol", "Dayem", "Elcore", "Qecus", "Kelchek"
  ];

  var xeno_stars = [
    "Co'eleth", "Ta'nazareth", "Gemel", "Armarath'ta", "Sep'talath", "Ugrada",
    "Elle'path", "Metron", "L'teega", "Rotogath", "Thraxunza", "Habareth",
    "U'mege", "O'be'talath", "Jep'negata", "Qa'tebe", "Zu'rer", "Pe'mereda",
    "Kia'peren", "O'be'ungre", "Xe'na'ra", "Fa'isara", "Wuvega", "Tal'tel'loth"
  ];

  this.planet_names = [
    "Miranda", "Nightfall", "Luminae", "Xerxes", "Nova", "Pavonon", "Virtue",
    "Journey's-End", "Fronteir", "Prosperity", "Naraka", "Biascay", "Attis",
    "Aether", "Bellataine", "Corudeen", "Heptimus", "Orchid", "Softwind", 
    "Lambda", "Wellington", "Everfall", "Edison", "Daylight", "Illius",
    "Kali", "Devestation", "Ravgana", "Quipid", "Tellius", "Yelis", "Oran",
    "Daedelus", "Zephyr", "Silvertone", "Juno", "Minerette", "Bastion",
    "Underwald", "Riechstag", "Enki", "Jakuta", "Elista", "Neverlave",
    "Pyritan", "Ventara", "Xebes", "Othello", "Julius", "Korb", "Bellborne",
    "Revenant", "Quetolal", "tantalak", "Apollo", "Ares", "Numeria", "Mathaka",
    "Tuva", "Wisper", "Inanna", "Athena", "Roya Vosar", "Omia", "Aizong", 
    "Thanatos", "Horikawa", "Sahana", "Scargill", "Coyopa", "Yovido",
    "Blerreon", "Zorada", "Eta Hades", "Taizu", "Hawking", "Maxia", "Orellius",
    "Orewellian", "Roanoke", "Nimiset", "Myar", "Dorcus", "Valissian", "Regan's Rest",
    "Never-look-back", "Formenos", "Atheni", "Faf", "Monarch", "Holiday", 
    "Belegost", "Ghazan", "Brakir", "Geryon", "Psi Zulu", "Malina", "Kaladria",
    "Ankou", "Krishna", "Vixif", "Amasis", "Consileen", "Karen", "Keiko",
    "Huronguar", "Carnavon", "Fideon", "Robor", "Iota Ermina", "Aleggro",
    "Cascade", "Harmony", "Leviathan", "Gravity", "J'Sepp Scoyfol", "Nemarch",
    "Portalis", "Arcaius", "New Patagonia", "Albea", "Orh'neon", "Zerenita",
    "Hera", "Honshu", "Arkanna", "Arawath", "Sarapis", "Unica", "Proxima"
  ];

  this.roman_numbers = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" ];

  this.greek_numbers = [ "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Theta", "Lambda", "Omicron", "Sigma", "Tau", "Omega" ];
 
  this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "8", "9", "10", "11", "12"];

  this.ranked = 0;
  this.named = 1;

  this.roman = 0;
  this.greek = 1;
  this.numerical = 2;

  this.starnames = [];
  this.planetnames = [];

  var roll;
  for(var i = 0; i < count; ++i) {
    roll = getRandomInt(0, 3);
    var name = null;
    if (roll == this.identified) {
      // Naming convention XX-Y
      name = "Sector ";
      for(var i = 0; i < 2; ++i) {
        name += charset.charAt(getRandomInt(0, charset.length));
      }
      name += "-" + charset.charAt(getRandomInt(0, charset.length));
    } else if (roll == this.named) {
      var index = getRandomInt(0, star_names.length);
      name = star_names[index];
      star_names.splice(index, 1);
    } else {
      var index = getRandomInt(0, xeno_stars.length);
      name = xeno_stars[index];
      star_names.splice(index, 1);
    }
    if (name != null) {
      this.starnames.push(name);
    } else {
      --i;
    }
  }

  for(var i = 0; i < count; ++i) {
    roll = getRandomInt(0, 3);
    this.planetnames.push(roll);
  }
}

NameGenerator.prototype.getStarName = function() {
  return this.starnames.shift();
}

NameGenerator.prototype.getPlanetNames = function(star) {
  var planets = [];
  var name_type = this.planetnames.shift();
  for (var i = 0; i < 12; ++i) {
    if ((this.planet_names.length > 0 ) && (getRandomInt(0, 20) == 0)) {
      var index = getRandomInt(0, this.planet_names.length);
      planets.push(this.planet_names[index]);
      this.planet_names.splice(index, 1);
    } else {
      if (name_type == this.roman) {
        planets.push(star + " " + this.roman_numbers[i]);
      } else if (name_type == this.greek) {
        planets.push(star + " " + this.greek_numbers[i]);
      } else {
        planets.push(star + " " + this.numbers[i]);
      }
    }
  }
  return planets;
}

NameGenerator.prototype.loadFrom = function(tree) {

  this.planet_names = tree["planet_names"];

  this.starnames = tree["starnames"];
  this.planetnames = tree["planetnames"];
}