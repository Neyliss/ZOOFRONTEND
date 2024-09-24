// Récupérer les éléments côté front-end par leur ID
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const selectAccountType = document.getElementById("AccountType");
const btnValidation = document.getElementById("btn-validation-inscription");
const inscrireForm = document.getElementById("registrationForm");

// Ajout d'écouteurs d'événements
inputNom.addEventListener("keyup", validateForm); 
inputPrenom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
selectAccountType.addEventListener("change", validateForm);
btnValidation.addEventListener("click", InscrireUser);

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);
    const accountTypeOk = validateRequired(selectAccountType);

    // Booléen permettant de vérifier si le remplissage des champs est correct
    if (nomOk && prenomOK && mailOk && passwordOk && passwordConfirmOk && accountTypeOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

// Vérifier la validité de l'adresse mail
function validateMail(input) {
    // Définir le regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Vérifier le mot de passe
function validatePassword(input) {
    // Définir le regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{12,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Vérifier la validation du mot de passe
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

// Fonction de validation des champs requis
function validateRequired(input) {
    if (input.value !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Gestion de l'envoi du formulaire
function InscrireUser() {
    let dataForm = new FormData(inscrireForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "firstName": dataForm.get("Nom"),
      "lastName": dataForm.get("Prenom"),
      "email": dataForm.get("Email"),
      "password": dataForm.get("mdp"),
      "AccountType" : dataForm.get("AccountType") 
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://127.0.0.1:8000/api/registration", requestOptions)
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
        document.location.href = "/signin"; 
    })
    .catch(error => console.log('error', error));
};
