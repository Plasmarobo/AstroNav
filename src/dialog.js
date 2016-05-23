function Dialog(id) {
  this.title = "No Title";
  this.sections = [];
  this.inputs = [];
  this.result = false;
  this.onResult = undefined;
  if (typeof id == 'undefined')
    this.id = "dialog";
  else
    this.id = id;
}

Dialog.prototype.addTitle = function(title) {
  this.title = title;
  document.getElementById(this.id + "_title").innerHTML = this.title;
}

Dialog.prototype.addSection = function(title) {
  var container = document.createElement('div');
  if (typeof title != 'undefined') {
    container.className = "infotab_subheader";
    container.innerHTML = title;
    this.sections.push(container);
    contianer = document.createElement('div');
  }
  container.className = "infotab_section";
  this.sections.push(container);
}

Dialog.prototype.addField = function(id, label, def_val) {
  var field = document.createElement('div');
  var container;
  if (typeof label != 'undefined') {
    container  = document.createElement('div');
    container.className = "infotab_label";
    container.innerHTML = label;
    field.appendChild(container);
  }
  container = document.createElement('input');
  container.id = id;
  container.className = "infotab_obv_input";
  if (typeof def_val != 'undefined') {
    container.value = def_val;
  }
  field.appendChild(container);
  field.className = "infotab_field";
  this.inputs.push(container);
  this.sections[this.sections.length-1].appendChild(field);
};

Dialog.prototype.addYesNo = function (question) {
  this.addSection(question);
  var btn = document.createElement('div');
  btn.className = "infotab_small_button green";
  btn.innerHTML = "Yes";
  var dia = this;
  btn.addEventListener("click", function() {
    dia.result = true;
    if (typeof dia.onResult != 'undefined')
      dia.onResult(dia.result);
    dia.close();
  });
  this.sections[this.sections.length-1].appendChild(btn);
  btn = document.createElement('div');
  btn.className = "infotab_small_button red";
  btn.innerHTML = "No";
  btn.addEventListener("click", function(){
    dia.result = false;
    if (typeof dia.onResult != 'undefined')
      dia.onResult(dia.result);
    dia.close();
  });
  this.sections[this.sections.length-1].appendChild(btn);
}

Dialog.prototype.addSubmit = function (text) {
  if(typeof text == 'undefined')
    text = "Submit";
  var btn = document.createElement('div');
  btn.className = "infotab_button green";
  btn.innerHTML = text;
  var dia = this;
  btn.addEventListener("click", function(){
    dia.result = true;
    var output = {};
    for(var input in dia.inputs) {
      input = dia.inputs[input];
      output[input.id] = input.value;
    }
    if (typeof dia.onResult != 'undefined')
      dia.onResult(dia.result, output);
    dia.close();
  });
  this.sections[this.sections.length-1].appendChild(btn);
}

Dialog.prototype.addTextArea = function(id, lines, text) {
  var area = document.createElement('textarea');
  area.rows = lines;
  area.cols = 50;
  area.className = "infotab_textarea";
  area.id = id;
  area.value = text;
  this.inputs.push(area);
  this.sections[this.sections.length-1].appendChild(area);
}

Dialog.prototype.show = function () {
  var dialog = document.getElementById("dialog");
  dialog.style.width = 500;
  dialog.style.height = 600;
  dialog.style.marginLeft = -250;
  dialog.style.top = 300;

  if (this.sections.length > 0) {
    for(var section in this.sections) {
      document.getElementById(this.id + "_body").appendChild(this.sections[section]);
    }
    document.getElementById(this.id).style.display = "block";
  }
}

Dialog.prototype.close = function() {
  document.getElementById(this.id + "_body").innerHTML = "";
  document.getElementById(this.id).style.display = "none";
}
