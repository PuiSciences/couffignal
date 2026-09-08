// Génère le tableau de bord
function generateDashboard() {
    const dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = "";
    salles.forEach(salle => {
        const card = document.createElement("div");
        card.className = `salle-card ${salle.status}`;
        card.onclick = () => showProblems(salle.id);
        card.innerHTML = `
            <h3>${salle.id}</h3>
            <p><strong>Statut :</strong> ${getStatusText(salle.status)}</p>
            <p><strong>Tickets :</strong> ${salle.tickets.length} | <strong>Boulot Labo :</strong> ${salle.labo.length}</p>
        `;
        dashboard.appendChild(card);
    });
}

// Affiche les problèmes d'une salle
function showProblems(salleId) {
    const problemsList = document.getElementById("problemsList");
    const salle = salles.find(s => s.id === salleId);
    problemsList.innerHTML = `
        <h2>Détails pour la salle ${salleId}</h2>
        ${salle.tickets.length === 0 && salle.labo.length === 0 ? "<p>Aucun problème signalé.</p>" : ""}
    `;

    // Affiche les tickets
    if (salle.tickets.length > 0) {
        problemsList.innerHTML += `<h3>🎫 Tickets (Maintenance)</h3>`;
        salle.tickets.forEach(ticket => {
            problemsList.innerHTML += `
                <div class="problem-item ticket">
                    <p><span class="type-ticket">🎫 Ticket</span> | <strong>Statut :</strong> <span class="status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span></p>
                    <p><strong>Description :</strong> ${ticket.description}</p>
                    <p><strong>Priorité :</strong> ${getPriorityText(ticket.priority)}</p>
                    <p><strong>Date :</strong> ${ticket.date}</p>
                </div>
            `;
        });
    }

    // Affiche les tâches labo
    if (salle.labo.length > 0) {
        problemsList.innerHTML += `<h3>🔧 Boulot Labo</h3>`;
        salle.labo.forEach(task => {
            problemsList.innerHTML += `
                <div class="problem-item labo">
                    <p><span class="type-labo">🔧 Labo</span> | <strong>Statut :</strong> <span class="status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span></p>
                    <p><strong>Description :</strong> ${task.description}</p>
                    <p><strong>Priorité :</strong> ${getPriorityText(task.priority)}</p>
                    <p><strong>Date :</strong> ${task.date}</p>
                </div>
            `;
        });
    }
}

// Filtre les problèmes
function filterProblems(type) {
    const problemsList = document.getElementById("problemsList");
    problemsList.innerHTML = `<h2>Problèmes filtrés (${type === 'all' ? 'Tous' : type === 'ticket' ? 'Tickets' : 'Boulot Labo'})</h2>`;
    let hasProblems = false;
    salles.forEach(salle => {
        const items = type === 'all' ? [...salle.tickets, ...salle.labo] :
                      type === 'ticket' ? salle.tickets :
                      salle.labo;
        items.forEach(item => {
            hasProblems = true;
            const itemType = type === 'ticket' ? 'ticket' : 'labo';
            problemsList.innerHTML += `
                <div class="problem-item ${itemType}">
                    <p><strong>Salle :</strong> ${salle.id} | <strong>Type :</strong> ${itemType === 'ticket' ? '🎫 Ticket' : '🔧 Labo'}</p>
                    <p><strong>Statut :</strong> <span class="status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></p>
                    <p><strong>Description :</strong> ${item.description}</p>
                    <p><strong>Priorité :</strong> ${getPriorityText(item.priority)}</p>
                    <p><strong>Date :</strong> ${item.date}</p>
                    <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
                </div>
            `;
        });
    });
    if (!hasProblems) problemsList.innerHTML += "<p>Aucun problème trouvé.</p>";
}

// Textes pour l'affichage
function getStatusText(status) {
    switch(status) {
        case "ok": return "✅ OK";
        case "warning": return "⚠️ À surveiller";
        case "error": return "❌ Urgent";
        default: return "❓ Inconnu";
    }
}

function getPriorityText(priority) {
    switch(priority) {
        case 0: return "Aucune";
        case 1: return "Faible";
        case 2: return "Élevée";
        default: return "Inconnue";
    }
}

// Initialisation
window.onload = function() {
    generateDashboard();
    showProblems("C117"); // Affiche les problèmes de C117 par défaut
};
