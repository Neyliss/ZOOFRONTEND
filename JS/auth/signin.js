const MailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById ("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials (){
    // information factis 
    // Ici appeler l'API pour vérifier les Credentials en BDD 

    if(MailInput.value == "test@mail.com" && PasswordInput.value == "123"){
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