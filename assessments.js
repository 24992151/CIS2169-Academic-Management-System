// Set base URL
const baseUrl = "http://localhost:3000";
const assessmentsUrl = `${baseUrl}/assessments`;

// Display assessments
function displayAssessments() {
  // Fetch assessments
  fetch(assessmentsUrl)
    .then((response) => response.json())
    .then((assessments) => {
      const assessmentList = document.getElementById("assessment-list");
      assessmentList.innerHTML = "";
      assessments.forEach((assessment) => {
        // Create a list item
        const listItem = document.createElement("li");
        listItem.textContent = `${assessment.name} (${assessment.type}) - ${assessment.weighting}`;
        assessmentList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error displaying assessments:", error);
    });
}

// Create new assessment
function createAssessment(event) {
  event.preventDefault();
  const name = document.getElementById("assessment-name").value;
  const type = document.getElementById("assessment-type").value;
  const weighting = document.getElementById("assessment-weighting").value;

  const newAssessment = {
    name,
    type,
    weighting,
  };

// Create new assessment programme (w/ POST)
  fetch(assessmentsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAssessment),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New assessment added:", data);
      // Update list of Assessments
      displayAssessments();
      document.getElementById("create-assessment-form").reset();
    })
    .catch((error) => {
      console.error("Error adding new assessment:", error);
    });
}

// Add event listener fir creating a new assessment
document
  .getElementById("submit-assessment-btn")
  .addEventListener("click", createAssessment);

// Call function to display assessments
displayAssessments();
