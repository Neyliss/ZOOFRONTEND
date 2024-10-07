document.addEventListener('DOMContentLoaded', function () {
    const scheduleList = document.getElementById('scheduleList');
    const addScheduleForm = document.getElementById('addScheduleForm');
    const displayedSchedule = document.getElementById('displayedSchedule');

    // Fonction pour récupérer les horaires depuis l'API
    function fetchSchedules() {
        fetch("https://127.0.0.1:8000/api/schedules/list")
            .then(response => response.json())
            .then(data => {
                schedules = data;  // Mettre à jour les horaires
                renderSchedules();
            })
            .catch(error => console.log('Erreur lors du fetch des horaires:', error));
    }

    // Fonction pour envoyer un nouvel horaire à l'API
    function createSchedule(newSchedule) {
        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSchedule)
        };

        fetch("https://127.0.0.1:8000/api/schedules/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                fetchSchedules();  // Rafraîchir la liste après ajout
            })
            .catch(error => console.log('Erreur lors de la création de l\'horaire:', error));
    }

    // Fonction pour modifier un horaire
    function updateSchedule(id, updatedSchedule) {
        let requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSchedule)
        };

        fetch(`https://127.0.0.1:8000/api/schedules/maj/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                fetchSchedules();  // Rafraîchir la liste après modification
            })
            .catch(error => console.log('Erreur lors de la mise à jour de l\'horaire:', error));
    }

    // Fonction pour supprimer un horaire
    function deleteSchedule(id) {
        let requestOptions = {
            method: 'DELETE',
        };

        fetch(`https://127.0.0.1:8000/api/schedules/delete/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                fetchSchedules();  // Rafraîchir la liste après suppression
            })
            .catch(error => console.log('Erreur lors de la suppression de l\'horaire:', error));
    }

    // Fonction pour rendre la liste des horaires
    function renderSchedules() {
        scheduleList.innerHTML = '';
        schedules.forEach(schedule => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                ${escapeHTML(schedule.day)} : ${escapeHTML(schedule.hours)}
                <div>
                    <button class="edit-btn btn btn-warning btn-sm me-2" data-id="${schedule.id}">Modifier</button>
                    <button class="delete-btn btn btn-danger btn-sm" data-id="${schedule.id}">Supprimer</button>
                </div>
            `;
            scheduleList.appendChild(li);
        });
        attachEventListeners();
        updateDisplayedSchedule();
    }

    // Fonction pour mettre à jour l'affichage des horaires
    function updateDisplayedSchedule() {
        displayedSchedule.innerHTML = schedules.map(schedule => `${escapeHTML(schedule.day)} : ${escapeHTML(schedule.hours)}`).join('<br>');
    }

    // Ajout d'un nouvel horaire
    addScheduleForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const day = addScheduleForm.day.value.trim();
        const hours = addScheduleForm.hours.value.trim();
        if (day && hours) {
            const newSchedule = { day, hours };
            createSchedule(newSchedule);
            addScheduleForm.reset();
        } else {
            alert("Tous les champs sont requis.");
        }
    });

    // Modifier un horaire
    function editSchedule(id) {
        const schedule = schedules.find(s => s.id === id);
        const newDay = prompt('Modifier le jour:', schedule.day);
        const newHours = prompt('Modifier les heures:', schedule.hours);
        if (newDay && newHours) {
            const updatedSchedule = { day: newDay.trim(), hours: newHours.trim() };
            updateSchedule(id, updatedSchedule);
        } else {
            alert("Tous les champs sont requis.");
        }
    }

    // Supprimer un horaire
    function deleteScheduleHandler(id) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet horaire?")) {
            deleteSchedule(id);
        }
    }

    // Ajout des écouteurs d'événements aux boutons
    function attachEventListeners() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'), 10);
                editSchedule(id);
            });
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'), 10);
                deleteScheduleHandler(id);
            });
        });
    }

    // Fonction pour éviter les attaques XSS
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            const escapeChars = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escapeChars[match];
        });
    }

    // Chargement initial des horaires
    fetchSchedules();
});
