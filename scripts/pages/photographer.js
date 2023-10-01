//import getPhotographers from "index.js";
async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    //et bien retourner le tableau photographers seulement une fois récupéré
    return (data)
}

function photographerProfil(data) {
    const {name, city, country, tagline, portrait} = data;

    function getUserCardDOM() {
        const info = document.createElement("div");
        info.className = "info";
        
        const photographername = document.createElement("h2");
        photographername.textContent = name;
        const photographerlocation = document.createElement("h3");
        photographerlocation.innerText = `${city}, ${country}`;
        const photographertag = document.createElement("h4");
        photographertag.textContent = tagline;
        const photographerimg = document.createElement("img");
        photographerimg.src = portrait;

        info.appendChild(photographername);
        info.appendChild(photographerlocation);
        info.appendChild(photographertag);

        const portraitContainer = document.querySelector(".portrait");
        portraitContainer.appendChild(photographerimg);

        return {info, portrait: portraitContainer};
    }
    return {name, city, country, tagline, portrait, getUserCardDOM }
}

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

async function init() {
    // Récupère les datas des photographes
    const data = await getData();
    const paramsString = window.location.search.substring(1);
    const searchParams = new URLSearchParams(paramsString);
    const id = searchParams.get("id");
    const photographer = data.photographers.find(photographer => photographer.id == id);

    if (photographer) {
        // Crée un objet de données du photographe avec une structure HTML
        const photographerData = photographerProfil(photographer);

        // Récupère l'élément d'affichage depuis l'objet de données
        const infoElement = photographerData.getUserCardDOM().info;

        // Assurez-vous d'avoir un élément HTML valide pour afficher les données
        const infoContainer = document.querySelector(".info");

        if (infoContainer) {
            // Remplacez l'élément existant par celui créé
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoElement);
        } else {
            console.error('Element with class "info" not found');
        }
    } else {
        console.log("Photographer not found with ID: " + id);
    }
}
    
// js array filter pour la liste de media
window.onload = function() {
    init();
}