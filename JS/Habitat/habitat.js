document.addEventListener('DOMContentLoaded', (event) => {
    let selectedPhotoCard = null;

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

            selectedPhotoCard = imageCard;

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

            selectedPhotoCard = imageCard;

            // Remplir la modal de suppression avec les informations de l'image
            const modal = document.getElementById('deletePhotoModal');
            modal.querySelector('#deletePhotoTitle').textContent = imageTitle;
            modal.querySelector('#deletePhotoImage').src = imageSrc;
        });
    });

    // Gérer l'enregistrement d'une photo
    document.getElementById('editionPhotoSaveButton').addEventListener('click', (event) => {
        const titleInput = document.getElementById('editionPhotoTitleInput').value;
        const imageInput = document.getElementById('editionPhotoImageInput').files[0];

        if (titleInput && imageInput) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (selectedPhotoCard) {
                    selectedPhotoCard.querySelector('.titre-image').textContent = titleInput;
                    selectedPhotoCard.querySelector('img').src = e.target.result;
                } else {
                    const newCard = createPhotoCard(titleInput, e.target.result);
                    document.getElementById('habitatsContainer').appendChild(newCard);
                }
                resetEditionModal();
            };
            reader.readAsDataURL(imageInput);
        } else if (selectedPhotoCard && titleInput) {
            selectedPhotoCard.querySelector('.titre-image').textContent = titleInput;
            resetEditionModal();
        }
    });

    // Gérer la suppression d'une photo
    document.getElementById('deletePhotoButton').addEventListener('click', (event) => {
        if (selectedPhotoCard) {
            selectedPhotoCard.parentNode.removeChild(selectedPhotoCard);
            selectedPhotoCard = null;
            resetDeleteModal();
        }
    });

    function createPhotoCard(title, imgSrc) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col p-3';
        colDiv.innerHTML = `
            <div class="image-card text-white">
                <a href="#">
                    <img src="${imgSrc}" class="rounded w-100" width="400" height="300" />
                    <p class="titre-image">${title}</p>
                </a>
                <div class="action-image-buttons" data-show="admin">
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#editionPhotoModal"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#deletePhotoModal"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `;
        // Ajouter les écouteurs d'événements pour les nouveaux boutons
        colDiv.querySelector('.btn-outline-light[data-bs-target="#editionPhotoModal"]').addEventListener('click', (event) => {
            const imageCard = colDiv.querySelector('.image-card');
            const imageTitle = imageCard.querySelector('.titre-image').textContent;

            selectedPhotoCard = imageCard;

            // Remplir la modal d'édition avec les informations de l'image
            const modal = document.getElementById('editionPhotoModal');
            modal.querySelector('#editionPhotoTitleInput').value = imageTitle;
            // Réinitialiser le champ de fichier pour une nouvelle édition
            modal.querySelector('#editionPhotoImageInput').value = '';
        });

        colDiv.querySelector('.btn-outline-light[data-bs-target="#deletePhotoModal"]').addEventListener('click', (event) => {
            const imageCard = colDiv.querySelector('.image-card');
            const imageTitle = imageCard.querySelector('.titre-image').textContent;
            const imageSrc = imageCard.querySelector('img').src;

            selectedPhotoCard = imageCard;

            // Remplir la modal de suppression avec les informations de l'image
            const modal = document.getElementById('deletePhotoModal');
            modal.querySelector('#deletePhotoTitle').textContent = imageTitle;
            modal.querySelector('#deletePhotoImage').src = imageSrc;
        });

        return colDiv;
    }

    function resetEditionModal() {
        document.getElementById('editionPhotoTitleInput').value = '';
        document.getElementById('editionPhotoImageInput').value = '';
        selectedPhotoCard = null;
        const editionPhotoModal = bootstrap.Modal.getInstance(document.getElementById('editionPhotoModal'));
        editionPhotoModal.hide();
    }

    function resetDeleteModal() {
        document.getElementById('deletePhotoTitle').innerText = '';
        document.getElementById('deletePhotoImage').src = '';
        selectedPhotoCard = null;
        const deletePhotoModal = bootstrap.Modal.getInstance(document.getElementById('deletePhotoModal'));
        deletePhotoModal.hide();
    }
});
