function openLightbox(index, titre) {
    const lightbox = document.getElementById("lightbox");
    const contenuPhotoLightbox = document.getElementById("contenu-photo-lightbox");
    const titrePhotoLightbox = document.getElementById("titre-photo-lightbox");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    document.getElementsByClassName("btn-contact")[0].style.display = "none";

    /* Obtient le nombre total de photos */
    let totalPhoto = document.querySelectorAll(".photo").length;
    /* Récupère la photo lié à l'index */
    let photos = document.getElementById(index);
    /* Obtient la source de l'image */
    let photosSrc = photos.getElementsByClassName("src-contenu")[0].getAttribute("src");
    /* Obtient le type de l'image */
    let photoType = photosSrc.split('.').pop();
    let photoFormat = "";
    if (photoType === "jpg" || photoType === "jpeg" || photoType == "gif" || photoType === "png") {
        photoFormat = "image";
    } else if (photoType === "mp4" || photoType === "mkv" || photoType === "avi") {
        photoFormat = "video";
    }
    /* Récupère l'id de la photo */
    let idPhoto = index;
    /* Affiche la lightbox */
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementById("lightbox").style.display = "block";
    /* Gère l'affichage des flèches */
    if (idPhoto === 1) {
        document.getElementById("fleche-gauche").style.display = "none";
        document.getElementById("fleche-droite").style.display = "block";
        /* Change les index des flèches */
        document.getElementById("fleche-gauche").setAttribute("onclick", "");
        document.getElementById("fleche-droite").setAttribute("onclick", "flecheDroite(" + (idPhoto + 1) + ")");
    } else if (idPhoto === totalPhoto) {
        document.getElementById("fleche-gauche").style.display = "block";
        document.getElementById("fleche-droite").style.display = "none";
        /* Change les index des flèches */
        document.getElementById("fleche-gauche").setAttribute("onclick", "flecheGauche(" + (idPhoto - 1) + ")");
        document.getElementById("fleche-droite").setAttribute("onclick", "");
    } else {
        document.getElementById("fleche-gauche").style.display = "block";
        document.getElementById("fleche-droite").style.display = "block";
        /* Change les index des flèches */
        document.getElementById("fleche-gauche").setAttribute("onclick", "flecheGauche(" + (idPhoto - 1) + ")");
        document.getElementById("fleche-droite").setAttribute("onclick", "flecheDroite(" + (idPhoto + 1) + ")");
    }
    /* Affiche la photo */
    if (photoFormat === "image") {
        document.getElementById("contenu-photo-lightbox").innerHTML = "<img alt='" + titre + "' id='photo-lightbox' src=" + photosSrc + ">";
    } else {
        document.getElementById("contenu-photo-lightbox").innerHTML = "<video title='" + titre + "' id='photo-lightbox' controls><source src=" + photosSrc + ">";
    }
    /** Affiche le titre */
    document.getElementById("titre-photo-lightbox").innerHTML = titre;
    /** Gére les flèches du clavier **/
    document.onkeydown = function (event) {
        /* Si la Lightbox est ouverte */
        if (document.getElementById("lightbox").style.display === "block") {
            switch (event.key) {
                case 'ArrowLeft':
                    flecheGauche(idPhoto - 1);
                    break;
                case 'ArrowRight':
                    flecheDroite(idPhoto + 1);
                default:
                    break;
            }
        }
    };
}

/* Ferme la lightbox */
function closeLightbox() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementById("lightbox").style.display = "none";
    document.getElementsByClassName("btn-contact")[0].style.display = "block";
}

/* Gère la flèche gauche */
function flecheGauche(index) {
    let titreAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, titreAvant);
}

/* Gère la flèche droite */
function flecheDroite(index) {
    let totalPhoto = document.querySelectorAll(".photo").length;
    if (index === (totalPhoto)) {
        let titreApres = Array.from(document.querySelectorAll('.photo')).pop();
        titreApres = titreApres.getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, titreApres);
    } else {
        let titreApres = document.getElementsByClassName("photo")[index-1].getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, titreApres);
    }
}