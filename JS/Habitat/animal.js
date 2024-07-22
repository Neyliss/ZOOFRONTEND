document.addEventListener('DOMContentLoaded', function () {
    let counts = {
        collapseOne: 0,
        collapseTwo: 0,
        collapseThree: 0
    };

    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (collapseLink) {
        collapseLink.addEventListener('click', function (event) {
            event.preventDefault(); // Empêche l'action par défaut du lien

            let targetId = collapseLink.getAttribute('href').slice(1); // Récupère l'ID cible sans le '#'

            counts[targetId]++; // Incrémente le compteur pour l'ID cible

            console.log('Target ID:', targetId); // Pour le débogage : vérifie l'ID cible
            console.log('Counts:', counts); // Pour le débogage : vérifie l'objet counts

            let counterElement = document.getElementById('counter' + targetId.charAt(targetId.length - 1));
            if (counterElement) {
                counterElement.textContent = counts[targetId]; // Met à jour l'affichage du compteur
            } else {
                console.error('Counter element not found for', targetId); // Pour le débogage : vérifie si l'élément du compteur est trouvé
            }
        });
    });
});

