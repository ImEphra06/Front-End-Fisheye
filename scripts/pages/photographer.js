async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    //et bien retourner le tableau entier
    return (data)
}

// Création en HTML des données des photographes que l'on veut afficher 
function photographerProfil(data) {
    const {name, city, country, tagline, portrait} = data;

    function getUserCardDOM() {
        const info = document.createElement("div");
        info.className = "info";
        
        const photographerName = document.createElement("h2");
        photographerName.textContent = name;
        const photographerLocation = document.createElement("h3");
        photographerLocation.innerText = `${city}, ${country}`;
        const photographerTag = document.createElement("h4");
        photographerTag.textContent = tagline;
        const photographerImg = document.createElement("img");
        photographerImg.src = portrait;

        info.appendChild(photographerName);
        info.appendChild(photographerLocation);
        info.appendChild(photographerTag);

        const portraitContainer = document.querySelector(".portrait");
        portraitContainer.appendChild(photographerImg);

        return {info, portrait: portraitContainer};
    }
    return {name, city, country, tagline, portrait, getUserCardDOM }
}

// Récupération des données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    // Effacez le contenu existant
    photographersSection.innerHTML = "";

    photographers.forEach((photographer) => {
        const photographerModel = photographerProfil(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM.info);
    });
}

function displayMedia(media) {
    const mediaSection = document.querySelector(".media");
    const ongletSection = document.querySelector(".onglet");
    const totalLike = document.createElement("div");
    totalLike.className = "total-like";
    
    // Effacez le contenu existant
    mediaSection.innerHTML = "";
	let totalLikes = 0;

    media.forEach((mediaItem, index) => {
        const mediaElement = document.createElement("div");
        mediaElement.className = "media-item";
        const mediaInfo = document.createElement("div");
        mediaInfo.className = "media-info";
        let mediaContent = null;
        // Vérification si c'est une image ou une vidéo en fonction des données
        if (mediaItem.image) {
            mediaContent = document.createElement("img");
            mediaContent.src = mediaItem.image;
        } else if (mediaItem.video) {
            mediaContent = document.createElement("video");
            mediaContent.src = mediaItem.video;
        }

		mediaContent.addEventListener("click", () => {
            openLightbox(index);
		});

        const mediaTitle = document.createElement("h2");
        mediaTitle.textContent = mediaItem.title;
        const mediaLike = document.createElement("h2");
        const likeNb = document.createElement("span");
        likeNb.innerText = mediaItem.likes;
        mediaLike.appendChild(likeNb);
        const likeIcon = document.createElement("i");
        likeIcon.className = "fa-solid fa-heart";
        mediaLike.appendChild(likeIcon);

        /*const likeIcon = document.createElement("div");
        likeIcon.className = "heart";
        const likeIcon1 = document.createElement("img");
        likeIcon1.src = "images/icons/heart.svg";
        likeIcon1.className = "heart_empty";
        const likeIcon2 = document.createElement("img");
        likeIcon2.src = "images/icons/heart_full.svg";
        likeIcon2.className = "heart_full";
        
        mediaLike.appendChild(likeIcon);
        likeIcon.appendChild(likeIcon1);
        likeIcon.appendChild(likeIcon2);*/
        
        // Ajoutez un gestionnaire d'événements pour incrémenter les likes
        likeIcon.addEventListener("click", () => {
            // Incrémentez le nombre de likes
            mediaItem.likes += 1;
            // Mettez à jour l'affichage du nombre de likes
            likeNb.innerText = mediaItem.likes;
            totalLikes += 1;
            totalLikesElement.textContent = totalLikes; // Mettez à jour l'affichage du total
        });

        mediaElement.appendChild(mediaContent);
        mediaElement.appendChild(mediaInfo);
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaLike);
        mediaSection.appendChild(mediaElement);
		totalLikes += mediaItem.likes;
    });

    ongletSection.innerHTML = "";
    const totalLikesElement = document.createElement("p");
    totalLikesElement.textContent = totalLikes;
    const likeIcon = document.createElement("i");
    likeIcon.className = "fa-solid fa-heart";
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${photographer.price}€ / jour`
    
    ongletSection.appendChild(totalLike);
    totalLike.appendChild(totalLikesElement);
    totalLike.appendChild(likeIcon);
    ongletSection.appendChild(photographerPrice);
}

let photographer = null;
let photographerMedia = [];

async function init() {
    // Récupère les datas des photographes
    const data = await getData();
    const paramsString = window.location.search.substring(1);
    const searchParams = new URLSearchParams(paramsString);
    const id = searchParams.get("id");
    photographer = data.photographers.find(photographer => photographer.id == id);

    if (photographer) {
        // Crée un objet de données du photographe avec une structure HTML
        const photographerData = photographerProfil(photographer);

        // Récupère l'élément d'affichage depuis l'objet de données
        const infoElement = photographerData.getUserCardDOM().info;
        const infoContainer = document.querySelector(".info");

        if (infoContainer) {
            // Remplacez l'élément existant par celui créé
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoElement);
        } else {
            console.error('Element with class "info" not found');
        }
    
        // Filtrer les medias du photographe actuel
        photographerMedia = data.media.filter(media => media.photographerId == id);
        
        // Afficher les médias du photographe sur la page
        displayMedia(photographerMedia);
        //openLightbox(0, photographerMedia);
    } else {
        console.log("Photographer not found with ID: " + id);
    }
}
    
// js array filter pour la liste de media
window.onload = function() {
    init();
}