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
btnValidation.addEventListener("click", RemplirVetform);

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

function RemplirVetform () {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "firstName": "Test Fetch",
      "lastName": "test test fetch ",
      "email": "testdepuisPostman@email.com",
      "password": "Azerty11"
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://127.0.0.1:8000/api/vet-form", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}