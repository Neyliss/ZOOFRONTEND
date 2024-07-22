 document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('form').addEventListener('submit', function(event) {
            const pseudo = document.getElementById('pseudo').value;
            const avis = document.getElementById('avis').value;
            const rating = document.querySelector('input[name="rating"]:checked');

            if (!pseudo || !avis || !rating) {
                event.preventDefault();
                alert('Veuillez remplir tous les champs et choisir une note.');
            }
        });
});

