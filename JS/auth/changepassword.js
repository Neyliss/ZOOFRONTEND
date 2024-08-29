document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('changePasswordForm');

    // Fonction pour vérifier les mots de passe
    function validatePasswords(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupération des valeurs des champs
        const password = document.getElementById('PasswordInput').value;
        const confirmPassword = document.getElementById('ValidatePasswordInput').value;

        // Validation des mots de passe
        if (!validatePasswords(password, confirmPassword)) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // Envoi des données au serveur via une requête fetch
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    passwordConfirm: confirmPassword
                })
            });

            if (!response.ok) {
                throw new Error('Erreur de serveur. Veuillez réessayer plus tard.');
            }

            // Traitement de la réponse
            const result = await response.json();
            if (result.success) {
                alert('Mot de passe changé avec succès.');
                // Redirection ou autre action après succès
                window.location.href = '/account'; // Redirige vers la page du compte ou autre
            } else {
                alert(result.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors du changement du mot de passe:', error);
            alert('Une erreur est survenue lors du changement de votre mot de passe. Veuillez réessayer.');
        }
    });
});
