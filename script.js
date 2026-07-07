let choixDate = "";
let choixTenue = "";
let choixRepas = "";

// 1. Le bouton NON s'enfuit + fait apparaître le GIF de Gaon qui dit non
function fuirBouton() {
    const btnNon = document.getElementById('btn-non');
    const gifWarning = document.getElementById('gif-warning');
    
    gifWarning.classList.remove('hidden');
    
    const maxX = window.innerWidth - btnNon.offsetWidth - 20;
    const maxY = window.innerHeight - btnNon.offsetHeight - 20;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    btnNon.style.position = 'fixed';
    btnNon.style.left = newX + 'px';
    btnNon.style.top = newY + 'px';
}

// 2. Clic sur OUI -> Confettis + Affichage du GIF Gaon Coeur
function validerQuiz() {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });

    document.getElementById('step-quiz').classList.add('hidden');
    document.getElementById('step-success-gif').classList.remove('hidden');

    // On laisse le GIF 3,2 secondes, puis on passe au choix de la date ET on change le fond !
    setTimeout(() => {
        document.getElementById('step-success-gif').classList.add('hidden');
        document.getElementById('step-date').classList.remove('hidden');
        
        // APPLICATION DU FOND DES ROSES POUR LA DATE
        document.body.style.backgroundImage = "url('fond-date.jpg')";
    }, 3200);
}

// 3. Enregistrement des choix et changement de fond automatique à chaque étape
function choisir(etape, valeur) {
    if (etape === 'date') {
        choixDate = valeur;
        document.getElementById('step-date').classList.add('hidden');
        document.getElementById('step-tenue').classList.remove('hidden');
        
        // APPLICATION DU FOND MIROIR POUR LES TENUES
        document.body.style.backgroundImage = "url('fond-tenue.jpg')";
        
    } else if (etape === 'tenue') {
        choixTenue = valeur;
        document.getElementById('step-tenue').classList.add('hidden');
        document.getElementById('step-repas').classList.remove('hidden');
        
        // APPLICATION DU FOND CAFÉ POUR LE REPAS
        document.body.style.backgroundImage = "url('fond-repas.jpg')";
        
    } else if (etape === 'repas') {
        choixRepas = valeur;
        document.getElementById('step-repas').classList.add('hidden');
        document.getElementById('step-bouquet').classList.remove('hidden');
        
        // APPLICATION DU FOND DRAPÉ DRAPÉ COEURS POUR LE FINAL
        document.body.style.backgroundImage = "url('fond-final.jpg')";
    }
}

// 4. Explosion du bouquet
function exploserBouquet() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    const recapZone = document.getElementById('recap-texte');
    recapZone.innerHTML = `
        📌 <b>Date :</b> ${choixDate}<br>
        👔 <b>Ta tenue préférée :</b> ${choixTenue}<br>
        🍽️ <b>Menu choisi :</b> ${choixRepas}
    `;

    setTimeout(() => {
        document.getElementById('step-bouquet').classList.add('hidden');
        document.getElementById('step-recap').classList.remove('hidden');
    }, 1200);
}

// 5. Envoi automatique par SMS
function envoyerResultats() {
    const message = `Coucou ! Voici mes choix pour notre date : \n\n🗓️ Date : ${choixDate}\n👔 Tenue : ${choixTenue}\n🍣 Repas : ${choixRepas}\n\nHâte d'y être ! ❤️`;
    
    // ⚠️ METS TON VRAI NUMÉRO ICI ! ⚠️
    const monNumero = "0600000000"; 
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const separateur = isIOS ? '&' : '?';
    const url = `sms:${monNumero}${separateur}body=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
}
