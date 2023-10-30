/***** Ouvrir la lightbox *****/

let globalIndex = 0;

function openLightbox(index) {
    if (index >= 0 && index < photographerMedia.length) {
        globalIndex = index;
        const selectedMedia = photographerMedia[index];
        const lightboxContent = document.getElementById("contenu-photo-lightbox");
        lightboxContent.innerHTML = "";

        if (selectedMedia.image) {
            const image = document.createElement("img");
            image.src = selectedMedia.image;
            lightboxContent.appendChild(image);
        } else if (selectedMedia.video) {
            const video = document.createElement("video");
            video.src = selectedMedia.video;
            lightboxContent.appendChild(video);
        }

        const titrePhotoLightbox = document.getElementById("titre-photo-lightbox");
        titrePhotoLightbox.textContent = selectedMedia.title;

        const lightbox = document.getElementById("lightbox");
        lightbox.classList.remove("hidden"); // Retirez la classe "hidden" pour afficher la lightbox
    }
}

/***** Ferme la lightbox *****/
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("hidden"); // Ajoutez à nouveau la classe "hidden" pour masquer la lightbox
}

// Variable globale pour stocker l'index du média actuellement affiché
let index = 0;

function flecheGauche() {
    // Vérifiez si l'index actuel est supérieur à 0
    if (index > 0) {
        index--; // Décrémentez l'index pour afficher le média précédent
        openLightbox(index); // Appelez une fonction pour afficher le nouveau média
    }
}

function flecheDroite() {
    // Vérifiez si l'index actuel est inférieur à la dernière position de média
    if (index < photographerMedia.length - 1) {
        index++; // Incrémentez l'index pour afficher le média suivant
        openLightbox(index); // Appelez une fonction pour afficher le nouveau média
    }
}