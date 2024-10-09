// Récupérer les éléments du formulaire par leur ID
const etatAnimal = document.getElementById("etatAnimal");
const nourritureProposee = document.getElementById("nourritureProposee");
const grammageNourriture = document.getElementById("grammageNourriture");
const datePassage = document.getElementById("datePassage");
const detailEtatAnimal = document.getElementById("detailEtatAnimal");
const btnValidation = document.getElementById("btn-validation-vetForm");
const formVeto = document.getElementById("vetForm");
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
    if (value !== "" && input.value !== "") {
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

// Fonction pour soumettre le formulaire
function RemplirVetform () {

    let dataForm = new FormData(formVeto);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "etatAnimal": dataForm.get("etat_animal"), 
      "nourriture": dataForm.get("nourriture_proposee"), 
      "gramme": dataForm.get("grammage_nourriture"), 
      "date": dataForm.get("date_passage"), 
      "detail" : dataForm.get("detail_etat_animal"), 
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/api/vet-form", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            alert("Erreur lors de l'inscription");
        }
    })
    .then(result => {
        alert("Bravo "+dataForm.get("prenom")+", vous êtes maintenant inscrit, vous pouvez vous connecter.");
        document.location.href="/veterinaire";
    })
    .catch(error => console.log('error', error));
};
