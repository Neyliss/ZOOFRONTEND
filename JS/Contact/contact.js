// Récupérer les éléments côté front end par leur ID
const inputTitre = document.getElementById("TitreInput");
const inputEmail = document.getElementById("EmailInput");
const inputDescription = document.getElementById("DescriptionInput");
const btnSubmit = document.querySelector("button[type='submit']");
const contactForm = document.getElementById("contactForm");
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

// Ajout d'un écouteur d'événement au input pour validation en temps réel
inputTitre.addEventListener("input", validateForm);
inputEmail.addEventListener("input", validateForm);
inputDescription.addEventListener("input", validateForm);

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
contactForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêcher la soumission réelle du formulaire

    const formData = {
        Titre: inputTitre.value.trim(),
        Email: inputEmail.value.trim(),
        Description: inputDescription.value.trim(),
    };

    try {
        const response = await fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            confirmationModal.show(); // Afficher la modale de confirmation
            confirmationModal._element.addEventListener('hidden.bs.modal', function () {
                window.location.href = '/'; // Remplacer par l'URL de la page d'accueil
            }, { once: true });
        } else {
            console.error('Erreur:', result.errors);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});
