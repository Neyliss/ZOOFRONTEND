// Récupérer les éléments côté front end par leur ID
const inputTitre = document.getElementById("TitreInput");
const inputEmail = document.getElementById("EmailInput");
const inputDescription = document.getElementById("DescriptionInput");
const btnValidation = document.getElementById("btn-validation-contact");
const contactForm = document.getElementById("contactForm");
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

// Ajout d'un écouteur d'événement au input pour validation en temps réel
inputTitre.addEventListener("input", validateForm);
inputEmail.addEventListener("input", validateForm);
inputDescription.addEventListener("input", validateForm);
btnValidation.addEventListener("click", ValidationContact);

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const titreOk = validateRequired(inputTitre);
    const emailOk = validateMail(inputEmail);
    const descriptionOk = validateRequired(inputDescription);
    const allFieldsFilled = inputTitre.value.trim() !== '' && inputEmail.value.trim() !== '' && inputDescription.value.trim() !== '';

    // Booléen permettant de vérifier si le remplissage des champs est correct
    btnSubmit.disabled = !(titreOk && emailOk && descriptionOk && allFieldsFilled);
}

// Vérifier la validité de l'adresse mail 
function validateMail(input) {
    // Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (emailRegex.test(mailUser)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// La fonction de validation des champs 
function validateRequired(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Désactiver le bouton de soumission au chargement initial de la page
document.addEventListener("DOMContentLoaded", function() {
    validateForm();
});

// Ajout d'un écouteur d'événement pour la soumission du formulaire
function ValidationContact ()
{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Titre": "Test postman",
  "pseudo": "test test",
  "Description": "Je suis content ",
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://127.0.0.1:8000/api/contact", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

};