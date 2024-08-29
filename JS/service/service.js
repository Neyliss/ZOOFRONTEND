document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const carouselIndicators = document.querySelector('.carousel-indicators');
  const publierPhotoModal = new bootstrap.Modal(document.getElementById('publierPhotoModal'));
  const erasePhotoModal = new bootstrap.Modal(document.getElementById('erasePhotoModal'));
  const joinPhotoModal = new bootstrap.Modal(document.getElementById('joinPhotoModal'));
  const savePublierPhotoButton = document.getElementById('savePublierPhotoButton');
  const confirmErasePhotoButton = document.getElementById('confirmErasePhotoButton');
  const saveJoinPhotoButton = document.getElementById('saveJoinPhotoButton');
  const publierPhotoTitle = document.getElementById('publierPhotoTitle');
  const publierPhotoDescription = document.getElementById('publierPhotoDescription');
  const publierPhotoImage = document.getElementById('publierPhotoImage');
  const erasePhotoTitle = document.getElementById('erasePhotoTitle');
  const erasePhotoImage = document.getElementById('erasePhotoImage');
  const joinPhotoTitle = document.getElementById('joinPhotoTitle');
  const joinPhotoDescription = document.getElementById('joinPhotoDescription');
  const joinPhotoImage = document.getElementById('joinPhotoImage');

  let currentEditIndex = null;
  let carouselData = [
      {
          title: "Restauration",
          description: "Profitez de notre service de restauration avec des options variées pour tous les goûts.",
          image: "/Images/Restaurationzoo.jpeg"
      },
      {
          title: "Boutique de Souvenirs",
          description: "Ramenez chez vous un souvenir de votre visite avec notre sélection de cadeaux et de souvenirs.",
          image: "/Images/Zooshop.jpeg"
      },
      {
          title: "Aires de Jeux",
          description: "Les enfants peuvent s'amuser dans nos aires de jeux sécurisées et adaptées à tous les âges.",
          image: "/Images/Airedejeux.jpeg"
      },
      {
          title: "Visites Guidées",
          description: "Participez à une visite guidée pour en savoir plus sur les animaux et les efforts de conservation du zoo.",
          image: "/Images/Visite.jpeg"
      }
  ];

  function renderCarousel() {
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';
      carouselData.forEach((item, index) => {
          const isActive = index === 0 ? 'active' : '';
          carouselInner.innerHTML += `
              <div class="carousel-item ${isActive}">
                  <img src="${item.image}" alt="${item.title}" class="d-block w-100" height="500">
                  <div class="carousel-caption">
                      <h3>${item.title}</h3>
                      <p>${item.description}</p>
                      <div class="action-image-buttons" data-show="admin">
                          <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#publierPhotoModal" data-index="${index}"><i class="bi bi-pencil-square"></i></button>
                          <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#erasePhotoModal" data-index="${index}"><i class="bi bi-trash"></i></button>
                      </div>
                  </div>
              </div>
          `;
          carouselIndicators.innerHTML += `
              <button type="button" data-bs-target="#demo" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="${item.title}"></button>
          `;
      });

      document.querySelectorAll('.action-image-buttons button[data-bs-target="#publierPhotoModal"]').forEach(button => {
          button.addEventListener('click', handleEditButtonClick);
      });

      document.querySelectorAll('.action-image-buttons button[data-bs-target="#erasePhotoModal"]').forEach(button => {
          button.addEventListener('click', handleDeleteButtonClick);
      });
  }

  function handleEditButtonClick(event) {
      const index = event.target.closest('button').dataset.index;
      const item = carouselData[index];
      publierPhotoTitle.value = item.title;
      publierPhotoDescription.value = item.description;
      publierPhotoImage.value = '';
      currentEditIndex = index;
      document.getElementById('publierPhotoModalLabel').innerText = `Édition de la photo ${item.title}`;
      publierPhotoModal.show();
  }

  function handleDeleteButtonClick(event) {
      const index = event.target.closest('button').dataset.index;
      const item = carouselData[index];
      erasePhotoTitle.innerText = item.title;
      erasePhotoImage.src = item.image;
      currentEditIndex = index;
      document.getElementById('erasePhotoModalLabel').innerText = `Suppression de la photo ${item.title}`;
      erasePhotoModal.show();
  }

  savePublierPhotoButton.addEventListener('click', () => {
      const newTitle = publierPhotoTitle.value;
      const newDescription = publierPhotoDescription.value;
      const newImageFile = publierPhotoImage.files[0];
      if (newImageFile) {
          const reader = new FileReader();
          reader.onload = () => {
              carouselData[currentEditIndex].image = reader.result;
              carouselData[currentEditIndex].title = newTitle;
              carouselData[currentEditIndex].description = newDescription;
              renderCarousel();
              publierPhotoModal.hide();
          };
          reader.readAsDataURL(newImageFile);
      } else {
          carouselData[currentEditIndex].title = newTitle;
          carouselData[currentEditIndex].description = newDescription;
          renderCarousel();
          publierPhotoModal.hide();
      }
  });

  confirmErasePhotoButton.addEventListener('click', () => {
      carouselData.splice(currentEditIndex, 1);
      renderCarousel();
      erasePhotoModal.hide();
  });

  saveJoinPhotoButton.addEventListener('click', () => {
      const newTitle = joinPhotoTitle.value;
      const newDescription = joinPhotoDescription.value;
      const newImageFile = joinPhotoImage.files[0];
      if (newImageFile) {
          const reader = new FileReader();
          reader.onload = () => {
              const newService = {
                  title: newTitle,
                  description: newDescription,
                  image: reader.result
              };
              carouselData.push(newService);
              renderCarousel();
              joinPhotoModal.hide();
          };
          reader.readAsDataURL(newImageFile);
      } else {
          alert('Veuillez sélectionner une image.');
      }
  });

  renderCarousel();
});
