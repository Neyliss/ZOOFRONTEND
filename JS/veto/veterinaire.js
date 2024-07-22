document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les éléments côté front end par leur ID
    const inputEtatAnimal = document.getElementById("etatAnimal");
    const inputNourritureProposee = document.getElementById("nourritureProposee");
    const inputGrammageNourriture = document.getElementById("grammageNourriture");
    const inputDatePassage = document.getElementById("datePassage");
    const inputDetailEtatAnimal = document.getElementById("detailEtatAnimal");
    const btnSubmit = document.getElementById("btn-validation-vetForm");
    const vetForm = document.getElementById("vetForm");
    const formFeedback = document.getElementById("formFeedback");

    // Ajout d'écouteurs d'événements
    inputEtatAnimal.addEventListener("keyup", validateForm);
    inputNourritureProposee.addEventListener("keyup", validateForm);
    inputGrammageNourriture.addEventListener("keyup", validateForm);
    inputDatePassage.addEventListener("change", validateForm);
    inputDetailEtatAnimal.addEventListener("keyup", validateForm);

    // Fonction permettant de valider tout le formulaire
    function validateForm() {
        const etatAnimalOk = validateRequired(inputEtatAnimal);
        const nourritureProposeeOk = validateRequired(inputNourritureProposee);
        const grammageNourritureOk = validateNumber(inputGrammageNourriture);
        const datePassageOk = validateRequired(inputDatePassage);
        const allFieldsFilled = inputEtatAnimal.value.trim() !== '' &&
                                inputNourritureProposee.value.trim() !== '' &&
                                inputGrammageNourriture.value.trim() !== '' &&
                                inputDatePassage.value.trim() !== '';

        // Activer ou désactiver le bouton de soumission
        btnSubmit.disabled = !(etatAnimalOk && nourritureProposeeOk && grammageNourritureOk && datePassageOk && allFieldsFilled);
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

    // Fonction de validation des champs numériques
    function validateNumber(input) {
        if (!isNaN(input.value) && input.value.trim() !== '') {
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
    validateForm();

    // Ajout d'un écouteur d'événement pour la soumission du formulaire
    vetForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher la soumission réelle du formulaire

        if (!btnSubmit.disabled) {
            formFeedback.innerHTML = '<div class="alert alert-success">Données enregistrées avec succès.</div>';
            vetForm.reset();
            vetForm.querySelectorAll('input, textarea').forEach(function (input) {
                input.classList.remove('is-valid');
            });
        } else {
            formFeedback.innerHTML = '<div class="alert alert-danger">Veuillez remplir tous les champs obligatoires.</div>';
        }
    });
});
