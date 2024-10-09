const MailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById ("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials (){
    // information factis 
    // Ici appeler l'API pour vérifier les Credentials en BDD 

    if(MailInput.value == "admin@mail.com" && PasswordInput.value == "Adminlog456789"){
        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/");
    }
    else{
        MailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");
    }
}









/*
const MailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    let dataForm = new FormData(signinForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("Email"),
        "password": dataForm.get("Password")
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // Si la réponse est une erreur (comme 401 Unauthorized)
                MailInput.classList.add("is-invalid");
                PasswordInput.classList.add("is-invalid");
                throw new Error('Unauthorized');  // On jette une erreur pour arrêter le flux
            }
        })
        .then(result => {
            // Vérifier si `apiToken` existe avant de l'utiliser
            if (result.apiToken) {
                const token = result.apiToken;
                setToken(token);
                setCookie(RoleCookieName, result.roles[0], 7);
                window.location.replace("/");
            } else {
                // Si `apiToken` n'existe pas, afficher une erreur
                console.error('apiToken is missing in the response');
                MailInput.classList.add("is-invalid");
                PasswordInput.classList.add("is-invalid");
            }
        })
        .catch(error => {
            console.error('error', error);
        });
}
*/