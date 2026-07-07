// Stockage des réponses de la princesse
let choixDate = "";
let choixTenue = "";
let choixRepas = "";

// 1. Gestion du bouton NON qui s'enfuit
function fuirBouton() {
    const btnNon = document.getElementById('btn-non');
    
    // On calcule des positions aléatoires dans l'écran
    const maxX = window.innerWidth - btnNon.offsetWidth - 20;
    const maxY = window.innerHeight - btnNon.offsetHeight - 20;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    // On force le bouton à bouger n'importe où sur l'écran
    btnNon.style.position = 'fixed';
    btnNon.style.left = newX + 'px';
    btnNon.style.top = newY + 'px';
}

// 2. Clic sur OUI -> Confettis et passage à la date
function validerQuiz() {
    // Explosion de confettis
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // On attend 1,5 seconde et on passe à la suite
    setTimeout(() => {
        document.getElementById('step-quiz').classList.add('hidden');
        document.getElementById('step-date').classList.remove('hidden');
    }, 1500);
}

// 3. Enregistrement des choix et changement de page
function choisir(etape, valeur) {
    if (etape === 'date') {
        choixDate = valeur;
        document.getElementById('step-date').classList.add('hidden');
        document.getElementById('step-tenue').classList.remove('hidden');
    } else if (etape === 'tenue') {
        choixTenue = valeur;
        document.getElementById('step-tenue').classList.add('hidden');
        document.getElementById('step-repas').classList.remove('hidden');
    } else if (etape === 'repas') {
        choixRepas = valeur;
        document.getElementById('step-repas').classList.add('hidden');
        document.getElementById('step-bouquet').classList.remove('hidden');
    }
}

// 4. Explosion du bouquet de fleurs
function exploserBouquet() {
    // Grosse explosion de confettis !
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Préparation du texte récapitulatif
    const recapZone = document.getElementById('recap-texte');
    recapZone.innerHTML = `
        📌 <b>Date :</b> ${choixDate}<br>
        👔 <b>Ta tenue :</b> ${choixTenue}<br>
        🍽️ <b>Repas :</b> ${choixRepas}
    `;

    // Passage à l'écran final
    setTimeout(() => {
        document.getElementById('step-bouquet').classList.add('hidden');
        document.getElementById('step-recap').classList.remove('hidden');
    }, 1200);
}

// 5. Envoi des résultats par WhatsApp/SMS
function envoyerResultats() {
    const message = `Coucou ! Voici mes choix pour notre date : \n\n🗓️ Date : ${choixDate}\n👔 Tenue : ${choixTenue}\n🍣 Repas : ${choixRepas}\n\nHâte d'y être ! ❤️`;
    
    // Remplace par ton vrai numéro de téléphone (Exemple : 33612345678 pour le 06 12 34 56 78)
    const monNumero = "33600000000"; 
    
    // Ouvre automatiquement WhatsApp avec le message pré-rempli
    const url = `https://wa.me/${monNumero}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
