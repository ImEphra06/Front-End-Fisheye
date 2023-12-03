document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById("sort-dropdown");
    const dropdownBtn = dropdown.querySelector(".sort-btn");
    const fleche = document.createElement('img');
    fleche.className = "chevron-down";
    fleche.src = 'images/icons/chevron-down-solid.svg';
    fleche.setAttribute('aria-label', 'Développer les optionsN');
    dropdownBtn.setAttribute("tabindex", "0");
    const dropdownContent = dropdown.querySelector(".sort-element");
    const dropdownOptions = dropdown.querySelectorAll(".dropdown-option");

    // Fonction pour ouvrir le menu déroulant
    function openDropdown() {
        dropdownContent.style.display = 'block';
        dropdownBtn.classList.add('active');
    }

    // Fonction pour fermer le menu déroulant
    function closeDropdown() {
        dropdownContent.style.display = 'none';
        dropdownBtn.classList.remove('active');
    }

    dropdownBtn.addEventListener('click', function () {
        // Utilisez la fonction openDropdown pour ouvrir/fermer le menu déroulant au clic
        if (dropdownContent.style.display === 'block') {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Ajoutez des écouteurs d'événements clavier
    dropdownBtn.addEventListener('keydown', function (event) {
        // Si la touche "Entrée" est pressée, ouvrez le menu déroulant
        if (event.key === 'Enter') {
            openDropdown();
        }
    });

    document.addEventListener('keydown', function (event) {
        // Si la touche "Échap" est pressée, fermez le menu déroulant
        if (event.key === 'Escape') {
            closeDropdown();
        }
    });

    dropdownOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            const selectedOption = option.getAttribute("data-sort");

            // Mise à jour du texte du bouton avec l'option sélectionnée
            dropdownBtn.textContent = `${selectedOption} `;
            dropdownBtn.appendChild(fleche);

            switch (selectedOption) {
                case "Popularité":
                    photographerMedia.sort(function (a, b) {
                        return a.likes - b.likes;
                    });
                    break;
                case "Date":
                    photographerMedia.sort(function (a, b) {
                        return a.date.localeCompare(b.date);
                    });
                    break;
                case "Titre":
                    photographerMedia.sort(function (a, b) {
                        return a.title.localeCompare(b.title);
                    });
                    break;
                default:
                    break;
            }

            displayMedia(photographerMedia);
            console.log('Option sélectionnée:', selectedOption);
            dropdownContent.style.display = 'none';
        });
    });

    // Fermer le menu déroulant si on clique en dehors de celui-ci
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }               
    });
});