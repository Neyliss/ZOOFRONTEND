// Récupérer les éléments du formulaire par leur ID
const etatAnimal = document.getElementById("etatAnimal");
const nourritureProposee = document.getElementById("nourritureProposee");
const grammageNourriture = document.getElementById("grammageNourriture");
const datePassage = document.getElementById("datePassage");
const detailEtatAnimal = document.getElementById("detailEtatAnimal");
const btnValidation = document.getElementById("btn-validation-vetForm");
const form = document.getElementById("vetForm");
const formFeedback = document.getElementById("formFeedback");

// Écouteurs d'événements pour la validation
etatAnimal.addEventListener("change", validateForm);
nourritureProposee.addEventListener("input", validateForm);
grammageNourriture.addEventListener("input", validateForm);
datePassage.addEventListener("input", validateForm);

// Fonction de validation du formulaire
function validateForm() {
    const etatAnimalOk = validateRequired(etatAnimal);
    const nourritureProposeeOk = validateRequired(nourritureProposee);
    const grammageNourritureOk = validateNumber(grammageNourriture);
    const datePassageOk = validateRequired(datePassage);

    if (etatAnimalOk && nourritureProposeeOk && grammageNourritureOk && datePassageOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

// Fonction pour valider les champs obligatoires
function validateRequired(input) {
    const value = sanitizeInput(input.value.trim());
    if (value !== "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour valider les champs numériques
function validateNumber(input) {
    const value = sanitizeInput(input.value.trim());
    if (value !== "" && !isNaN(value) && Number(value) > 0) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour échapper les entrées utilisateur (prévention XSS)
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

// Gestion de l'envoi du formulaire
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!btnValidation.disabled) {
        // Logique d'envoi du formulaire sécurisé
        const formData = {
            etatAnimal: sanitizeInput(etatAnimal.value),
            nourritureProposee: sanitizeInput(nourritureProposee.value),
            grammageNourriture: sanitizeInput(grammageNourriture.value),
            datePassage: sanitizeInput(datePassage.value),
            detailEtatAnimal: sanitizeInput(detailEtatAnimal.value)
        };
        
        // Simulation de l'envoi des données au serveur
        console.log("Données du formulaire:", formData);

        // Effacer le contenu de formFeedback pour éviter l'accumulation des tableaux de bord
        formFeedback.innerHTML = "";

        // Afficher un tableau de bord après la soumission
        displayDashboard(formData);

        formFeedback.innerHTML += "<div class='alert alert-success mt-3'>Formulaire envoyé avec succès !</div>";
        form.reset();
        btnValidation.disabled = true;
    } else {
        formFeedback.innerHTML = "<div class='alert alert-danger'>Veuillez remplir tous les champs obligatoires correctement.</div>";
    }
});

// Fonction pour afficher un tableau de bord après la soumission
function displayDashboard(data) {
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard mt-4';
    dashboard.innerHTML = `
        <h3>Tableau de bord</h3>
        <p><strong>État de l'animal:</strong> ${data.etatAnimal}</p>
        <p><strong>Nourriture proposée:</strong> ${data.nourritureProposee}</p>
        <p><strong>Grammage de la nourriture:</strong> ${data.grammageNourriture} g</p>
        <p><strong>Date de passage:</strong> ${data.datePassage}</p>
        <p><strong>Détail de l'état de l'animal:</strong> ${data.detailEtatAnimal}</p>
    `;
    formFeedback.appendChild(dashboard);
}


// JS pour l'envoi du formulaire à vérifier avant teste 
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!btnValidation.disabled) {
        const formData = {
            etatAnimal: etatAnimal.value,
            nourritureProposee: nourritureProposee.value,
            grammageNourriture: grammageNourriture.value,
            datePassage: datePassage.value,
            detailEtatAnimal: detailEtatAnimal.value,
            animalName: animalNameInput.value
        };

        fetch('/api/vet-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Formulaire envoyé avec succès !");
                formFeedback.innerHTML = "<div class='alert alert-success'>Formulaire envoyé avec succès !</div>";
                form.reset();
                btnValidation.disabled = true;
            } else {
                formFeedback.innerHTML = "<div class='alert alert-danger'>Une erreur est survenue. Veuillez réessayer.</div>";
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            formFeedback.innerHTML = "<div class='alert alert-danger'>Une erreur est survenue. Veuillez réessayer.</div>";
        });
    } else {
        formFeedback.innerHTML = "<div class='alert alert-danger'>Veuillez remplir tous les champs obligatoires correctement.</div>";
    }
});
