const modal = document.querySelector(".modal");
const openModalButton = document.querySelector(".contact-button");

function displayModal() {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.querySelector(".modal").style.display = "block";
    document.getElementsByClassName("contact-button")[0].style.display = "none";
    document.getElementById("contact-name").innerHTML = photographer.name;
    
    /***** Gestion des flèches du clavier *****/
    const actionForm = document.querySelectorAll('.action-form');
    actionForm.forEach(function (action, i) {
        if (document.querySelector(".modal").style.display === "block") {
            action.addEventListener('keydown', function (events) {
                switch (events.key) {
                    case 'ArrowUp':
                        if (i !== 0) {
                            action.parentNode.getElementsByClassName('action-form')[i - 1].focus()
                        }
                        break;
                    case 'ArrowDown':
                        if (i !== (actionForm.length - 1)) {
                            action.parentNode.getElementsByClassName('action-form')[i + 1].focus()
                        }
                        break;
                    default:
                        break;
                }
            })
        }
    });
}

function closeModal() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.querySelector(".modal").style.display = "none";
    document.getElementsByClassName("contact-button")[0].style.display = "block";
}

function validContact() {
    let nom = document.getElementById("form-name").value;
    let prenom = document.getElementById("form-lastname").value;
    let email = document.getElementById("form-email").value;
    let message = document.getElementById("form-message").value;

    console.log("NOM : " + nom + " PRENOM : " + prenom);
    console.log("ADRESSE EMAIL : " + email);
    console.log("MESSAGE : " + message);

    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.querySelector(".modal").style.display = "none";
    document.getElementsByClassName("contact-button")[0].style.display = "block";
}

// Écoutez les événements au clavier pour gérer la navigation Tab
modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        // Récupérez tous les éléments focusables dans la modal
        const focusableElements = modal.querySelectorAll("input, textarea, button");
        const closeButton = document.querySelector('img[tabindex="0"]');

        // Récupérez l'index de l'élément actif
        const activeElementIndex = Array.from(focusableElements).findIndex((element) => element === document.activeElement);

        if (activeElementIndex === -1) {
            // Si l'élément actif n'est pas à l'intérieur de la modal, ramenez-le au premier élément
            focusableElements[0].focus();
            event.preventDefault();
        } else if (event.shiftKey && activeElementIndex === 0) {
            // Si Shift + Tab est enfoncé sur le premier élément, déplacez le focus vers le dernier élément
            focusableElements[focusableElements.length - 1].focus();
            event.preventDefault();
        } else if (!event.shiftKey && activeElementIndex === focusableElements.length - 1) {
            // Si Tab est enfoncé sur le dernier élément, déplacez le focus vers le bouton de fermeture
            closeButton.focus();
            event.preventDefault();
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});