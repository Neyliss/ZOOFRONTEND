const MailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

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