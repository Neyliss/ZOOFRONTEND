document.addEventListener('DOMContentLoaded', () => {
    let selectedPhotoCard = null;

    // Initialiser toutes les modales à l'aide de Bootstrap
    document.querySelectorAll('.modal').forEach(modal => {
        new bootstrap.Modal(modal);
    });

    // Charger les habitats depuis le serveur
    fetch('/api/habitat')
        .then(response => {
            if (!response.ok) throw new Error('Erreur lors du chargement des habitats.');
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('#habitatsContainer .row');
            data.forEach(habitat => {
                const newCard = createPhotoCard(habitat.name, habitat.image_path, habitat.id);
                container.appendChild(newCard);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Impossible de charger les habitats.');
        });

    // Gestion du clic sur le bouton d'édition ou de suppression
    document.getElementById('habitatsContainer').addEventListener('click', event => {
        const button = event.target.closest('.btn-outline-light');
        if (!button) return;

        const imageCard = button.closest('.image-card');
        const habitatId = imageCard.dataset.habitatId;
        selectedPhotoCard = imageCard;

        if (button.dataset.bsTarget === '#editionPhotoModal') {
            // Remplir la modal d'édition avec les informations de l'image
            const title = imageCard.querySelector('.titre-image').textContent;
            document.getElementById('editionPhotoTitleInput').value = title;
            document.getElementById('editionPhotoImageInput').value = '';
        } else if (button.dataset.bsTarget === '#deletePhotoModal') {
            // Remplir la modal de suppression avec les informations de l'image
            const title = imageCard.querySelector('.titre-image').textContent;
            const imageUrl = imageCard.querySelector('img').src;
            document.getElementById('deletePhotoTitle').textContent = title;
            document.getElementById('deletePhotoImage').src = imageUrl;
        }
    });

    // Gérer l'enregistrement d'une photo
    document.getElementById('editionPhotoSaveButton').addEventListener('click', () => {
        const titleInput = document.getElementById('editionPhotoTitleInput').value.trim();
        const imageInput = document.getElementById('editionPhotoImageInput').files[0];

        if (!titleInput) {
            alert('Le titre est requis.');
            return;
        }

        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;

                if (selectedPhotoCard) {
                    updatePhotoCard(selectedPhotoCard, titleInput, imageData);
                    updateHabitat(selectedPhotoCard.dataset.habitatId, titleInput, imageData);
                } else {
                    createNewHabitat(titleInput, imageData);
                }
                resetEditionModal();
            };
            reader.readAsDataURL(imageInput);
        } else if (selectedPhotoCard) {
            updatePhotoCard(selectedPhotoCard, titleInput);
            updateHabitat(selectedPhotoCard.dataset.habitatId, titleInput);
            resetEditionModal();
        }
    });

    // Gérer la suppression d'une photo
    document.getElementById('deletePhotoButton').addEventListener('click', () => {
        if (selectedPhotoCard) {
            const habitatId = selectedPhotoCard.dataset.habitatId;
            deleteHabitat(habitatId).then(() => {
                selectedPhotoCard.remove();
                resetDeleteModal();
            }).catch(error => {
                console.error('Erreur:', error);
                alert('Impossible de supprimer la photo.');
            });
        }
    });

    // Créer une nouvelle carte photo
    function createPhotoCard(title, imageUrl, habitatId) {
        const col = document.createElement('div');
        col.className = 'col p-3';

        const card = document.createElement('div');
        card.className = 'image-card text-white';
        card.dataset.habitatId = habitatId;

        const link = document.createElement('a');
        link.href = '#';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'rounded w-100';
        img.width = 400;
        img.height = 300;

        const p = document.createElement('p');
        p.className = 'titre-image';
        p.textContent = title;

        const actions = document.createElement('div');
        actions.className = 'action-image-buttons';
        actions.dataset.show = 'admin';

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-light';
        editButton.dataset.bsToggle = 'modal';
        editButton.dataset.bsTarget = '#editionPhotoModal';
        editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-light';
        deleteButton.dataset.bsToggle = 'modal';
        deleteButton.dataset.bsTarget = '#deletePhotoModal';
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        link.appendChild(img);
        link.appendChild(p);

        card.appendChild(link);
        card.appendChild(actions);

        col.appendChild(card);

        return col;
    }

    // Mettre à jour une carte photo existante
    function updatePhotoCard(card, title, imageUrl = null) {
        card.querySelector('.titre-image').textContent = title;
        if (imageUrl) {
            card.querySelector('img').src = imageUrl;
        }
    }

    // Créer un nouvel habitat via l'API
    function createNewHabitat(title, imageData) {
        fetch('/api/habitat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                image_path: imageData
            })
        }).then(response => response.json())
          .then(data => {
              const newCard = createPhotoCard(title, imageData, data.id);
              document.querySelector('#habitatsContainer .row').appendChild(newCard);
          }).catch(error => {
              console.error('Erreur:', error);
              alert('Impossible de créer l\'habitat.');
          });
    }

    // Mettre à jour un habitat via l'API
    function updateHabitat(id, title, imageData = null) {
        const body = { name: title };
        if (imageData) {
            body.image_path = imageData;
        }

        fetch(`/api/habitat/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(error => {
            console.error('Erreur:', error);
            alert('Impossible de mettre à jour l\'habitat.');
        });
    }

    // Supprimer un habitat via l'API
    function deleteHabitat(id) {
        return fetch(`/api/habitat/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) throw new Error('Erreur lors de la suppression de l\'habitat.');
        });
    }

    // Réinitialiser la modal d'édition
    function resetEditionModal() {
        selectedPhotoCard = null;
        const modal = document.getElementById('editionPhotoModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
    }

    // Réinitialiser la modal de suppression
    function resetDeleteModal() {
        selectedPhotoCard = null;
        const modal = document.getElementById('deletePhotoModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
    }
});
