async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
}

function photographerProfil(data) {
    const { name, city, country, tagline, portrait } = data;

    function getUserCardDOM() {
        const info = document.createElement("div");
        info.className = "info";

        const photographerName = document.createElement("h1");
        photographerName.textContent = name;
        const photographerLocation = document.createElement("h2");
        photographerLocation.innerText = `${city}, ${country}`;
        const photographerTag = document.createElement("h3");
        photographerTag.textContent = tagline;
        const photographerImg = document.createElement("img");
        photographerImg.src = portrait;
        photographerImg.setAttribute('aria-label', 'Photographer portrait - ' + name);

        info.appendChild(photographerName);
        info.appendChild(photographerLocation);
        info.appendChild(photographerTag);

        const portraitContainer = document.querySelector(".portrait");
        portraitContainer.appendChild(photographerImg);

        return { info, portrait: portraitContainer };
    }
    return { name, city, country, tagline, portrait, getUserCardDOM };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    photographersSection.innerHTML = "";

    photographers.forEach((photographer) => {
        const photographerModel = photographerProfil(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM.info);
    });
}

let likesState = {};
let totalLikesElement;

function attachLikeEvents(likeIcon, likeNb, mediaItem) {
    likeIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            changeLikeState(likeIcon, likeNb, mediaItem);
        }
    });

    likeIcon.addEventListener("click", () => {
        changeLikeState(likeIcon, likeNb, mediaItem);
    });
}

function changeLikeState(likeIcon, likeNb, mediaItem) {
    let DOMLikes = parseInt(likeNb.innerText);
    const likeIcon1 = likeIcon.querySelector(".heart_empty");
    const likeIcon2 = likeIcon.querySelector(".heart_full");

    if (DOMLikes === mediaItem.likes) {
        // L'utilisateur n'a pas encore liké ce média, donc on incrémente
        likeIcon1.style.opacity = 0;
        likeIcon2.style.opacity = 1;
        DOMLikes += 1;
    } else {
        // L'utilisateur a déjà liké ce média, donc on décrémente
        likeIcon1.style.opacity = 1;
        likeIcon2.style.opacity = 0;
        DOMLikes -= 1;
    }

    // Affichage du nouveau nombre de likes dans le HTML
    likeNb.innerText = DOMLikes;

    // Mettez à jour l'état des likes pour ce média
    likesState[mediaItem.id] = { likes: DOMLikes, isLiked: DOMLikes > mediaItem.likes };

    // Mettez à jour l'affichage du nombre total de likes
    updateTotalLikes();
}

function updateTotalLikes() {
    let newTotalLikes = 0;

    photographerMedia.forEach((mediaItem) => {
        newTotalLikes += likesState[mediaItem.id] ? likesState[mediaItem.id].likes : mediaItem.likes;
    });

    // Mettez à jour l'affichage du nombre total de likes
    totalLikesElement.textContent = newTotalLikes;
}

function attachLikeEvents(likeIcon, likeNb, mediaItem) {
    likeIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            changeLikeState(likeIcon, likeNb, mediaItem);
        }
    });

    likeIcon.addEventListener("click", () => {
        changeLikeState(likeIcon, likeNb, mediaItem);
    });
}

function mediaTemplate(mediaItem, index) {
    function getUserMediaDOM() {
        const mediaElement = document.createElement("div");
        mediaElement.className = "media-item";
        const mediaInfo = document.createElement("div");
        mediaInfo.className = "media-info";
        let mediaContent = null;

        if (mediaItem.image) {
            mediaContent = document.createElement("img");
            mediaContent.src = mediaItem.image;
            mediaContent.setAttribute('aria-label', 'Photographer media - ' + mediaItem.title);
            mediaContent.setAttribute("tabindex", "0");
            mediaContent.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    openLightbox(index);
                }
            });
        } else if (mediaItem.video) {
            mediaContent = document.createElement("video");
            mediaContent.src = mediaItem.video;
            mediaContent.setAttribute('aria-label', 'Photographer media - ' + mediaItem);
            mediaContent.setAttribute("tabindex", "0");
            mediaContent.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    openLightbox(index);
                }
            });
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

        const likeIcon = document.createElement("div");
        likeIcon.className = "heart";
        likeIcon.setAttribute("tabindex", "0");

        const likeIcon1 = document.createElement("img");
        likeIcon1.src = "images/icons/heart.svg";
        likeIcon1.setAttribute('aria-label', 'Heart icon - not liked');
        likeIcon1.className = "heart_empty";

        const likeIcon2 = document.createElement("img");
        likeIcon2.src = "images/icons/heart_full.svg";
        likeIcon2.setAttribute('aria-label', 'Heart icon - liked');
        likeIcon2.className = "heart_full";

        mediaLike.appendChild(likeIcon);
        likeIcon.appendChild(likeIcon1);
        likeIcon.appendChild(likeIcon2);

        // Attachez les événements à l'icône de like
        attachLikeEvents(likeIcon, likeNb, mediaItem);

        if (likesState[mediaItem.id]) {
            likeNb.innerText = likesState[mediaItem.id].likes;
            if (likesState[mediaItem.id].isLiked) {
                likeIcon.querySelector(".heart_empty").style.opacity = 0;
                likeIcon.querySelector(".heart_full").style.opacity = 1;
            } else {
                likeIcon.querySelector(".heart_empty").style.opacity = 1;
                likeIcon.querySelector(".heart_full").style.opacity = 0;
            }
        }

        mediaElement.appendChild(mediaContent);
        mediaElement.appendChild(mediaInfo);
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaLike);

        // Ajout de la classe "tabbable" pour permettre la navigation avec la touche "Tab"
        mediaElement.classList.add("tabbable");

        const tabbableElement = document.createElement("div");
        tabbableElement.className = "tabbable";

        mediaElement.appendChild(tabbableElement);

        mediaElement.addEventListener("keydown", function (event) {
            if (event.key === "Tab") {
                // Trouver tous les éléments "tabbable" dans le média actuel
                const tabbableElements = mediaElement.querySelectorAll(".tabbable");

                // Trouver l'index de l'élément actuellement focus
                const currentIndex = Array.from(tabbableElements).indexOf(document.activeElement);

                // Déterminer le prochain index dans la liste circulaire
                const nextIndex = (currentIndex + 1) % tabbableElements.length;

                // Mettre le focus sur le prochain élément "tabbable"
                tabbableElements[nextIndex].focus();
            }
        });

        return mediaElement;
    }

    return { getUserMediaDOM };
}

async function displayMedia(media) {
    const mediaSection = document.querySelector(".media");

    // Effacer le contenu existant
    mediaSection.innerHTML = "";

    media.forEach((mediaItem, index) => {
        const { getUserMediaDOM } = mediaTemplate(mediaItem, index);
        const userMediaDOM = getUserMediaDOM();
        mediaSection.appendChild(userMediaDOM);

        // Restaurer l'état des likes à partir de likesState si disponible
        if (likesState[mediaItem.id]) {
            const likeNb = userMediaDOM.querySelector(".media-info h2 span");
            const likeIcon = userMediaDOM.querySelector(".media-info .heart");
            const { likes, isLiked } = likesState[mediaItem.id];

            likeNb.innerText = likes;

            if (isLiked) {
                likeIcon.querySelector(".heart_empty").style.opacity = 0;
                likeIcon.querySelector(".heart_full").style.opacity = 1;
            } else {
                likeIcon.querySelector(".heart_empty").style.opacity = 1;
                likeIcon.querySelector(".heart_full").style.opacity = 0;
            }
        }
    });

    // Création de l'onglet en bas à droite
    const ongletSection = document.querySelector(".onglet");
    totalLikesElement = document.createElement("div");
    totalLikesElement.className = "total-like";

    ongletSection.innerHTML = "";

    const likeIcon = document.createElement("i");
    likeIcon.className = "fa-solid fa-heart";
    
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${photographer.price}€ / jour`;

    ongletSection.appendChild(totalLikesElement);
    ongletSection.appendChild(likeIcon);
    ongletSection.appendChild(photographerPrice);

    // Mettre à jour l'affichage du nombre total de likes
    updateTotalLikes();
}

let photographer = null;
let photographerMedia = [];

async function init() {
    // Récupérer les données des photographes
    const data = await getData();
    const paramsString = window.location.search.substring(1);
    const searchParams = new URLSearchParams(paramsString);
    const id = searchParams.get("id");
    photographer = data.photographers.find(photographer => photographer.id == id);

    if (photographer) {
        // Créer un objet de données du photographe avec une structure HTML
        const photographerData = photographerProfil(photographer);

        // Récupérer l'élément d'affichage depuis l'objet de données
        const infoElement = photographerData.getUserCardDOM().info;
        const infoContainer = document.querySelector(".info");

        if (infoContainer) {
            // Remplacer l'élément existant par celui créé
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoElement);
        } else {
            console.error('Element with class "info" not found');
        }

        // Filtrer les médias du photographe actuel
        photographerMedia = data.media.filter(media => media.photographerId == id);

        // Afficher les médias du photographe sur la page
        displayMedia(photographerMedia);
    } else {
        console.log("Photographer not found with ID: " + id);
    }
}

// Initialiser la page lors du chargement
window.onload = function () {
    init();
}