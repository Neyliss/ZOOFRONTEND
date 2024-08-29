document.addEventListener('DOMContentLoaded', function () {
    const scheduleList = document.getElementById('scheduleList');
    const addScheduleForm = document.getElementById('addScheduleForm');
    const displayedSchedule = document.getElementById('displayedSchedule');

    // Dummy data for demonstration
    let schedules = [
        { id: 1, day: 'Lundi', hours: '12:00-14:00' },
        { id: 2, day: 'Mardi', hours: '18:00-23:00' }
    ];

    // Function to render schedule list
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

    // Function to update displayed schedule
    function updateDisplayedSchedule() {
        displayedSchedule.innerHTML = schedules.map(schedule => `${escapeHTML(schedule.day)} : ${escapeHTML(schedule.hours)}`).join('<br>');
    }

    // Add schedule
    addScheduleForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const day = addScheduleForm.day.value.trim();
        const hours = addScheduleForm.hours.value.trim();
        if (day && hours) {
            const newSchedule = { id: Date.now(), day, hours };
            schedules.push(newSchedule);
            renderSchedules();
            addScheduleForm.reset();
        } else {
            alert("Tous les champs sont requis.");
        }
    });

    // Edit schedule
    function editSchedule(id) {
        const schedule = schedules.find(s => s.id === id);
        const newDay = prompt('Modifier le jour:', schedule.day);
        const newHours = prompt('Modifier les heures:', schedule.hours);
        if (newDay && newHours) {
            schedule.day = newDay.trim();
            schedule.hours = newHours.trim();
            renderSchedules();
        } else {
            alert("Tous les champs sont requis.");
        }
    }

    // Delete schedule
    function deleteSchedule(id) {
        schedules = schedules.filter(s => s.id !== id);
        renderSchedules();
    }

    // Attach event listeners to buttons
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
                if (confirm("Êtes-vous sûr de vouloir supprimer cet horaire?")) {
                    deleteSchedule(id);
                }
            });
        });
    }

    // Escape HTML to prevent XSS
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

    // Initial rendering of schedules
    renderSchedules();
});
