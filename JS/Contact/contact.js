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
    btnValidation.disabled = !(titreOk && emailOk && descriptionOk && allFieldsFilled);
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
function ValidationContact() {
    let dataForm = new FormData(contactForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "Titre": dataForm.get("Titre"),
        "Email": dataForm.get("Email"),
        "Description": dataForm.get("Description"),
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/contactcreate", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            alert("Erreur lors de l'envoi de la demande");
        }
    })
    .then(result => {
        console.log(result);
        confirmationModal.show();
        document.location.href="/";
    })
    .catch(error => console.log('error', error));

};
