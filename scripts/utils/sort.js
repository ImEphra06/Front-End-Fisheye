function trier(choixTrier) {
    let listPhotos = document.querySelectorAll('.photo');
    let sortTable = [];

    for (let i = 0; i < listPhotos.length; i++) {
        sortTable.push(listPhotos[i]);
    }
    switch (choixTrier.value) {
        case "Popularité":
            sortTable.sort(function (a, b) {
                return a.dataset.likes - b.dataset.likes;
            });
            break;
        case "Date":
            sortTable.sort(function (a, b) {
                return a.dataset.date.localeCompare(b.dataset.date);
            });
            break;
        case "Titre":
            sortTable.sort(function (a, b) {
                return a.dataset.titre.localeCompare(b.dataset.titre);
            });
            break;
        default:
            break;
    }

    sortTable.forEach(function (photo, index) {
        let indexModif = index + 1;
        let titreModif = photo.dataset.titre;
        photo.setAttribute("id", indexModif);
        photo.getElementsByClassName("lien-lightbox")[0].setAttribute("onclick", "ouvreLightbox(" + `${indexModif}` + ", '" + titreModif + "')")
        document.getElementById("profil-liste-photos").append(photo);
    });
}