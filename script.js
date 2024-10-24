// Initialiser le compteur de visites
document.addEventListener('DOMContentLoaded', () => {
    let visites = localStorage.getItem('visites');

    if (!visites) {
        visites = 0; // Si le compteur n'existe pas, l'initialiser à 0
    }

    visites = parseInt(visites) + 1; // Incrémente le compteur de 1
    localStorage.setItem('visites', visites); // Stocke la nouvelle valeur dans localStorage

    // Met à jour le compteur affiché sur la page avec un plus devant
    document.getElementById('visites').textContent = `+${visites}`;
});

// Compteur d'animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter h3');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const count = parseFloat(counter.innerText.replace('+', '')); // Retirer le plus pour le calcul
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = `+${(count + inc).toFixed(0)}`; // Affiche le nombre sans décimales avec le plus
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = `+${target}`; // Met à jour avec le target final avec le plus
            }
        };
        counter.classList.add('animate-slide-up');
        updateCount();
    });
});

// Gestion du formulaire de contact avec EmailJS et reCAPTCHA
        const form = document.getElementById('contactForm');
        const messageStatus = document.getElementById('messageStatus');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Vérifiez le reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                alert("Veuillez confirmer que vous n'êtes pas un robot.");
                return;
            }

            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Envoyer l'email via EmailJS
            emailjs.send('w&scorporation_admin', 'template_4u7uycs', {
                nom: nom,
                email: email,
                message: message,
                recaptcha: recaptchaResponse // Inclure la réponse reCAPTCHA
            })
            .then(function(response) {
                console.log('Email envoyé avec succès!', response.status, response.text);
                showSuccessMessage();
                form.reset();
                grecaptcha.reset(); // Réinitialiser le reCAPTCHA après l'envoi
            }, function(error) {
                console.log('Erreur lors de l\'envoi de l\'email...', error);
                showErrorMessage();
            });
        });

        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.classList.add('alert', 'alert-success');
            successMessage.textContent = 'Votre message a bien été envoyé !';
            messageStatus.innerHTML = '';
            messageStatus.appendChild(successMessage);
        }

        function showErrorMessage() {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('alert', 'alert-danger');
            errorMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
            messageStatus.innerHTML = '';
            messageStatus.appendChild(errorMessage);
        }

// Initialisation d'EmailJS
(function() {
    emailjs.init("47Lvn8HBkIv_7OJt7");
})();

// Gestion du menu de navigation
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const overlay = document.querySelector('.overlay');
const arrow = document.getElementById('arrow'); // Ajout de la flèche

let isMenuOpen = false;

// Ouvrir/fermer le menu
navbarToggler.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    toggleMenu(isMenuOpen);
});

// Fermer le menu lorsque l'utilisateur clique en dehors
document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar-collapse') && !event.target.closest('.navbar-toggler') && isMenuOpen) {
        isMenuOpen = false;
        toggleMenu(isMenuOpen);
    }
});

// Fermer le menu lorsque l'on clique sur un lien
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        isMenuOpen = false;
        toggleMenu(isMenuOpen);
    });
});

// Fonction pour gérer l'ouverture et la fermeture du menu
function toggleMenu(isOpen) {
    navbarCollapse.classList.toggle('show', isOpen);
    overlay.classList.toggle('show', isOpen);
    navbarCollapse.style.transition = isOpen ? 'none' : 'left 0.3s ease-in-out';

    // Gérer la rotation de la flèche
    if (isOpen) {
        arrow.style.transform = 'rotate(180deg)'; // Flèche vers le haut
    } else {
        arrow.style.transform = 'rotate(0deg)'; // Flèche vers le bas
    }
}

// Éviter la propagation de l'événement de clic sur le menu
navbarCollapse.addEventListener('click', (event) => {
    event.stopPropagation();
});


// Récupérer le modal
const modal = document.getElementById("privacyPolicyModal");
const privacyPolicyLink = document.getElementById("privacyPolicyLink");
const closeModal = document.getElementById("closeModal");

// Ouvrir le modal lorsque l'utilisateur clique sur le lien de la politique de confidentialité
privacyPolicyLink.onclick = function(event) {
    event.preventDefault(); // Empêche le lien de naviguer
    modal.style.display = "block"; // Affiche le modal
};

// Fermer le modal lorsque l'utilisateur clique sur la croix
closeModal.onclick = function() {
    modal.style.display = "none"; // Masque le modal
};

// Fermer le modal lorsque l'utilisateur clique en dehors du contenu du modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Masque le modal
    }
};
