
// Récupérer les éléments côté front end par leur ID
const inputPseudo = document.getElementById("pseudo");
const inputAvis = document.getElementById("avis");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const btnSubmit = document.getElementById("btn-submit-review");
const reviewForm = document.getElementById("reviewForm");
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

// Ajout d'un écouteur d'événement au keyup pour validation en temps réel
inputPseudo.addEventListener("input", validateForm);
inputAvis.addEventListener("input", validateForm);
ratingInputs.forEach(radio => radio.addEventListener("change", validateForm));

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const pseudoOk = validateRequired(inputPseudo);
    const avisOk = validateRequired(inputAvis);
    const ratingOk = validateRating(ratingInputs);

    // Activer ou désactiver le bouton de soumission
    btnSubmit.disabled = !(pseudoOk && avisOk && ratingOk);
}

// Fonction de validation des champs requis
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

// Fonction de validation des étoiles
function validateRating(inputs) {
    let isValid = false;
    inputs.forEach(input => {
        if (input.checked) {
            isValid = true;
        }
    });

    if (isValid) {
        document.querySelector('.star-rating').classList.remove("is-invalid");
    } else {
        document.querySelector('.star-rating').classList.add("is-invalid");
    }

    return isValid;
}

// Désactiver le bouton de soumission au chargement initial de la page
document.addEventListener("DOMContentLoaded", function() {
    validateForm();
});

// Ajout d'un écouteur d'événement pour la soumission du formulaire
reviewForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher la soumission réelle du formulaire
    confirmationModal.show(); // Afficher la modale de confirmation
    
    confirmationModal._element.addEventListener('hidden.bs.modal', function () {
        window.location.href = '/'; // Remplacer par l'URL de la page d'accueil
    }, { once: true });
});



