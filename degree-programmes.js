// Set base URL
const baseUrl = "http://localhost:3000";
const degreeProgrammesUrl = `${baseUrl}/degree-programmes`;

// Add event listeners
const form = document.querySelector('#create-degree-programme-form');
const create_degree = document.querySelector('#submit-degree-programme-btn');
const degreeList = document.querySelector('#degree-programme-list');

// Toggle button for form
create_degree.addEventListener("click", event => {
  form.classList.toggle('hidden');
});

// Submit form to create a new degree programme
form.addEventListener("submit", event => {
  event.preventDefault();
  createDegreeProgramme();
});

// Display list of degree programmes
function displayDegreeProgrammes() {
  degreeList.innerHTML = "";

  // Fetch list of degree programmes
  fetch(degreeProgrammesUrl)
    .then((response) => response.json())
    .then((degreeProgrammes) => {
      degreeProgrammes.forEach((degreeProgramme) => {
        const degreeProgrammeButton = document.createElement("button");
        degreeProgrammeButton.textContent = degreeProgramme.degree_title;

        degreeList.appendChild(degreeProgrammeButton);
      });
    })
    .catch((error) => {
      console.error("Error displaying degree programmes:", error);
    });
}

// Create new degree programme (w/ POST)
function createDegreeProgramme() {
  const degreeId = document.getElementById("degree-programme-id").value;
  const degreeTitle = document.getElementById("degree-programme-name").value;
  const exitAwards = document.getElementById("degree-programme-exit-awards").value;
  const academicLevel = document.getElementById("degree-programme-academic").value;
  const learningOutcomes = document.getElementById("degree-programme-learning-outcomes").value.split(',').map(item => item.trim());
  const moduleList = document.getElementById("module-list").value.split(',').map(item => item.trim());

  const newDegreeProgramme = {
    id: degreeId,
    degree_id: degreeId,
    degree_title: degreeTitle,
    exit_awards: exitAwards,
    academic: academicLevel,
    learning_outcomes: learningOutcomes,
    modules_list: moduleList,
  };

  fetch(degreeProgrammesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDegreeProgramme),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New degree programme added:", data);
      displayDegreeProgrammes();
      form.reset();
      form.classList.add('hidden');
    })
    .catch((error) => {
      console.error("Error adding new degree programme:", error);
    });
}

// Call function
displayDegreeProgrammes();