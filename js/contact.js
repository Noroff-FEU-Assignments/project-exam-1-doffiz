const APIURL = "https://egwkacnv.elementor.cloud/wp-json";

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isNameValid() || !isEmailValid() || !isSubjectValid() || !isMessageValid()) {
    displayError("Please fill out all the fields correctly");
  } else {
    const formData = new FormData(contactForm);
    formData.append("your-name", nameInput.value);
    formData.append("your-email", emailInput.value);
    formData.append("your-subject", subjectInput.value);
    formData.append("your-message", messageInput.value);

    fetch(`${APIURL}/contact-form-7/v1/contact-forms/197/feedback/`, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        contactForm.innerHTML = `<h2>Thank you for your message!</h2>`;
      })
      .catch(error => {
        console.log(error);
        contactForm.innerHTML = `<h2>Sorry, something went wrong!</h2>`;
      });
  }
});


function isNameValid() {
  if (!nameInput.validity.valid) {
    clearError();
    displayError("Name should be more than 5 characters long");
    return false;
  }
  clearError();
  return true;
}

function isEmailValid() {
  if (!emailInput.validity.valid) {
    clearError();
    displayError("Invalid email address");
    return false;
  }
  clearError();
  return true;
}

function isSubjectValid() {
  if (!subjectInput.validity.valid) {
    clearError();
    displayError("Subject should be more than 15 characters long");
    return false;
  }
  clearError();
  return true;
}

function isMessageValid() {
  if (!messageInput.validity.valid) {
    clearError();
    displayError("Message content should be more than 25 characters long");
    return false;
  }
  clearError();
  return true;
}

function displayError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.textContent = message;
  contactForm.appendChild(errorElement);
}

function clearError() {
  const errorElement = contactForm.querySelector(".error");
  if (errorElement) {
    errorElement.remove();
  }
}
