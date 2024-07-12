document.addEventListener('DOMContentLoaded', (event) => {

    // Initialiser toutes les modales à l'aide de Bootstrap
    var modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        new bootstrap.Modal(modal);
    });

    // Gérer le clic sur le bouton d'édition
    document.querySelectorAll('.action-image-buttons .btn-outline-light[data-bs-target="#editionPhotoModal"]').forEach(button => {
        button.addEventListener('click', (event) => {
            const imageCard = button.closest('.image-card');
            const imageTitle = imageCard.querySelector('.titre-image').textContent;

            // Remplir la modal d'édition avec les informations de l'image
            const modal = document.getElementById('editionPhotoModal');
            modal.querySelector('#editionPhotoTitleInput').value = imageTitle;
            // Réinitialiser le champ de fichier pour une nouvelle édition
            modal.querySelector('#editionPhotoImageInput').value = '';
        });
    });

    // Gérer le clic sur le bouton de suppression
    document.querySelectorAll('.action-image-buttons .btn-outline-light[data-bs-target="#deletePhotoModal"]').forEach(button => {
        button.addEventListener('click', (event) => {
            const imageCard = button.closest('.image-card');
            const imageTitle = imageCard.querySelector('.titre-image').textContent;
            const imageSrc = imageCard.querySelector('img').src;

            // Remplir la modal de suppression avec les informations de l'image
            const modal = document.getElementById('deletePhotoModal');
            modal.querySelector('#deletePhotoTitle').textContent = imageTitle;
            modal.querySelector('#deletePhotoImage').src = imageSrc;
        });
    });

    // Gérer l'enregistrement d'une photo
    document.getElementById('editionPhotoSaveButton').addEventListener('click', (event) => {
        // Récupérer les données éditées depuis la modal d'édition
        const title = document.getElementById('editionPhotoTitleInput').value;
        // Ici vous pouvez traiter l'enregistrement des données (ex: soumettre via AJAX)
        console.log('Titre édité :', title);
        // Fermer la modal d'édition après enregistrement
        const modal = document.getElementById('editionPhotoModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide(); // Fermer la modal
    });

    // Gérer la suppression d'une photo
    document.getElementById('deletePhotoButton').addEventListener('click', (event) => {
        // Ici vous pouvez traiter la suppression de l'image (ex: soumettre via AJAX)
        console.log('Image supprimée');
        // Fermer la modal de suppression après confirmation
        const modal = document.getElementById('deletePhotoModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide(); // Fermer la modal
    });

});


