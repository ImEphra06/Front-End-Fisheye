document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById("sort-dropdown");
    const dropdownBtn = dropdown.querySelector(".sort-btn");
    dropdownBtn.setAttribute("tabindex", "0");
    const dropdownContent = dropdown.querySelector(".sort-element");
    const dropdownOptions = dropdown.querySelectorAll(".dropdown-option");

    dropdownBtn.addEventListener('click', function () {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
        dropdownBtn.classList.toggle('active');
    });

    dropdownOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            const selectedOption = option.getAttribute("data-sort");

            // Mise à jour du texte du bouton avec l'option sélectionnée
            dropdownBtn.textContent = selectedOption;

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

