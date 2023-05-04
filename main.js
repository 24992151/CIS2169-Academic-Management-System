var pageCounter = 1;
var moduleContainer = document.getElementById('module-info');
var btn = document.getElementById("btn");
var createModuleForm = document.getElementById("create-module-form");
var moduleDisplay = document.getElementById("module-display");
var submitModuleBtn = document.getElementById("submit-module-btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/CIS2169-Academic-Management-System/main/module-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3){
    btn.disabled = true;
  }
});

function renderHTML(data){
  var htmlString = "";

  for(i = 0; i < data.length; i++){
    htmlString += "<p>" + data[i].Name + " is a " + data[i].Course + " has assessments ";
    for(ii = 0; ii < data[i].Module.Assignment.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Assignment[ii];
      } else {
        htmlString += " and " + data[i].Module.Assignment[ii];
      }
    }
    htmlString += ' and Learning Outcome ';
    for(ii = 0; ii < data[i].Module.Learning_outcomes.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Learning_outcomes[ii];
      } else {
        htmlString += " and " + data[i].Module.Learning_outcomes[ii];
      }
    }

    htmlString += ' and Volume ';
    for(ii = 0; ii < data[i].Module.Volume.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Volume[ii];
      } else {
        htmlString += " and " + data[i].Module.Volume[ii];
      }
    }

    htmlString += ' and weights ';
    for(ii = 0; ii < data[i].Module.weights.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.weights[ii];
      } else {
        htmlString += " and " + data[i].Module.weights[ii];
      }
    }
    htmlString += '.</p>';
  }
  moduleContainer.insertAdjacentHTML('beforeend', htmlString);
}
