document.addEventListener('DOMContentLoaded', () => {
    const missionList = document.getElementById('missionList');

    // Exemple de données de mission
    const missions = [
        { title: "Design UI/UX", company: "TechCorp", budget: 5000, keywords: ["design", "mobile"], date: "2024-08-30", location: "paris", profile: "design" },
        { title: "Photographe événementiel", company: "EventPro", budget: 3000, keywords: ["photo", "événement"], date: "2024-08-29", location: "marseille", profile: "photo" },
        // Ajoute d'autres missions ici
    ];

    // Fonction pour afficher les missions
    function displayMissions(missions) {
        missionList.innerHTML = '';
        missions.forEach(mission => {
            const missionElement = document.createElement('div');
            missionElement.classList.add('mission');
            missionElement.innerHTML = `
                <h3>${mission.title}</h3>
                <p><strong>Entreprise:</strong> ${mission.company}</p>
                <p><strong>Budget:</strong> <span class="budget">${mission.budget}€</span></p>
                <p><strong>Date:</strong> <span class="date">${mission.date}</span></p>
                <div class="keywords">
                    ${mission.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
                </div>
                <div class="mission-buttons">
                    <button class="apply-button">Postuler</button>
                    <button class="details-button">Voir les détails</button>
                </div>
            `;
            missionList.appendChild(missionElement);
        });
    }

    // Fonction pour filtrer les missions
    function filterMissions() {
        const searchTerm = document.querySelector('#searchBar input').value.toLowerCase();
        const profile = document.getElementById('profileFilter').value;
        const budget = parseInt(document.getElementById('budgetRange').value);
        const location = document.getElementById('locationFilter').value;

        const filteredMissions = missions.filter(mission => {
            return (
                (mission.title.toLowerCase().includes(searchTerm) || mission.company.toLowerCase().includes(searchTerm)) &&
                (profile ? mission.profile === profile : true) &&
                (location ? mission.location === location : true) &&
                mission.budget <= budget
            );
        });

        displayMissions(filteredMissions);
    }

    // Afficher les missions initiales
    displayMissions(missions);

    // Ajouter des écouteurs d'événements pour la recherche et les filtres
    document.querySelector('#searchBar input').addEventListener('input', filterMissions);
    document.getElementById('profileFilter').addEventListener('change', filterMissions);
    document.getElementById('budgetRange').addEventListener('input', (e) => {
        document.getElementById('budgetValue').textContent = `0 - ${e.target.value}€`;
        filterMissions();
    });
    document.getElementById('locationFilter').addEventListener('change', filterMissions);
});
