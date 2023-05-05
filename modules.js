// Set base URL
const baseUrl = "http://localhost:3000";
const modulesUrl = `${baseUrl}/modules`;

// Add event listeners
const form = document.querySelector('#add-module-form');
const add_module = document.querySelector('#add-module-btn');
const moduleContainer = document.querySelector('#module-container');

// Submit form to create a new module
form.addEventListener("submit", event => {
  event.preventDefault();
  createModule();
});

// Display list of modules
function displayModules() {
  moduleContainer.innerHTML = "";

  // Fetch list of modules
  fetch(modulesUrl)
    .then((response) => response.json())
    .then((modules) => {
      modules.forEach((module) => {
        const moduleDiv = document.createElement("div");
        moduleDiv.textContent = `${module.module_code} - ${module.module_name}`;

        moduleContainer.appendChild(moduleDiv);
      });
    })
    .catch((error) => {
      console.error("Error displaying modules:", error);
    });
}

// Create new module (w/ POST)
function createModule() {
  const moduleCode = document.getElementById("module-code").value;
  const moduleName = document.getElementById("module-name").value;
  const moduleCredit = document.getElementById("module-credit").value;
  const moduleDescription = document.getElementById("module-description").value;

  const newModule = {
    module_code: moduleCode,
    module_name: moduleName,
    credit: moduleCredit,
    description: moduleDescription,
  };

  fetch(modulesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newModule),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New module added:", data);
      displayModules();
      form.reset();
      form.parentElement.classList.add('hidden');
    })
    .catch((error) => {
      console.error("Error adding new module:", error);
    });
}

// Call function
displayModules();
