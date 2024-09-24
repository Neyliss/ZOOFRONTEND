const MailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById ("btnSignin");
const signinForm = document.getElementById("signinForm");
btnSignin.addEventListener("click", checkCredentials);

function checkCredentials (){
    // Ici appeler l'API pour vérifier les Credentials en BDD 
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

    fetch("https://127.0.0.1:8000/api/login", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }
    })
    .then(result => {
        const token = result.apiToken;
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, result.roles[0], 7);
        window.location.replace("/");
    })
    .catch(error => console.log('error', error));
}



/*
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

btnSignin.addEventListener("click", function() {
    const email = MailInput.value;
    const password = PasswordInput.value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            setCookie('authToken', data.token, 7);
            setCookie('userRole', data.role, 7);
            window.location.replace("/");
        } else {
            MailInput.classList.add("is-invalid");
            PasswordInput.classList.add("is-invalid");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        MailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");
    });
});
*/