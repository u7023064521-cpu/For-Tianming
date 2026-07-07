const btnNon = document.getElementById('btn-non');
const btnOui = document.getElementById('btn-oui');

// Fonction pour déplacer le bouton NON au hasard
function fuirBouton() {
    // On calcule une position aléatoire sur l'écran (en pixels)
    // On enlève 100 pixels pour éviter que le bouton sorte complètement de l'écran
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    
    // On applique les nouvelles coordonnées au bouton
    btnNon.style.left = x + 'px';
    btnNon.style.top = y + 'px';
}

// Événement : si on passe la souris dessus (sur ordinateur)
btnNon.addEventListener('mouseover', fuirBouton);

// Événement : si on le touche avec le doigt (sur téléphone)
btnNon.addEventListener('touchstart', fuirBouton);

// Événement : si on clique sur OUI !
btnOui.addEventListener('click', () => {
    alert("YAY ! Moi aussi ! 🥰 Rendez-vous bientôt !");
});
