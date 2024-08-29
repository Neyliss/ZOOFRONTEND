$(document).ready(function() {
    // Récupérer les données des animaux depuis l'API
    $.get('/api/animals', function(data) {
        data.forEach(function(animal) {
            var animalCard = $('.animal-card[data-animal="' + animal.name + '"]');
            animalCard.data('id', animal.id);
            animalCard.data('prenom', animal.prenom);
            animalCard.data('race', animal.race);
            animalCard.data('habitat', animal.habitat);
            animalCard.data('image', animal.image);
        });
    });

    $('.animal-card').click(function() {
        var animalId = $(this).data('id');
        var animal = $(this).data('animal');
        var prenom = $(this).data('prenom');
        var race = $(this).data('race');
        var habitat = $(this).data('habitat');
        var image = $(this).data('image');

        // Mise à jour du contenu du modal
        $('#animalModalLabel').text(animal);
        $('#animalModalPrenom').text(prenom);
        $('#animalModalRace').text(race);
        $('#animalModalHabitat').text(habitat);
        $('#animalModalImage').attr('src', image);

        // Mise à jour du compteur de vues via l'API
        $.post('/api/animals/' + animalId + '/increment-view', function() {
            var currentViews = parseInt($('#animalModalViews').text()) || 0;
            $('#animalModalViews').text(currentViews + 1);
        });

        // Affichage du modal
        $('#animalModal').modal('show');
    });
});
