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
btnSubmit.addEventListener ("click", ValidationAvis);

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


function ValidationAvis() {
    let dataForm = new FormData(reviewForm);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "pseudo": dataForm.get("Sseudo"),
        "avis": dataForm.get("Avis"),
        "note": dataForm.get(document.querySelector('input[name="rating"]:checked').value), 
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/review/create", requestOptions)
        .then(response => {
            if(response.ok){
            return response.json();
        }
            else{
                alert("Erreur lors de l'inscription");
        }
    })
        .then(result => {
            console.log(result);
            confirmationModal.show();
            document.location.href="/";
    })
    .catch(error => console.log('error', error));
};
