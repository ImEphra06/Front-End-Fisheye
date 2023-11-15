 // Récupération des données de l'éléments phtographers dans le fichiers JSON
 async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    //et bien retourner le tableau photographers seulement une fois récupéré
    return (data.photographers)
}

// Utilisation des données souhaitées
function photographerTemplate(data) {
    const {portrait, name, id, city, country, tagline, price} = data;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const link = document.createElement("a");
        link.href = `photographer.html?id=${id}`;

        const photographerImg = document.createElement("img");
        photographerImg.src = portrait;
        photographerImg.alt = `Photographer portrait - ${name}`;
        const photographerName = document.createElement("h2");
        photographerName.textContent = name;
        const photographerLocation = document.createElement("h3");
        photographerLocation.innerText = `${city}, ${country}`;
        const photographerTag = document.createElement("h4");
        photographerTag.textContent = tagline;
        const photographerPrice = document.createElement("p");
        photographerPrice.textContent = `${price}€ / jour`
        
        article.appendChild(link);
        link.appendChild(photographerImg);
        link.appendChild(photographerName);
        article.appendChild(photographerLocation);
        article.appendChild(photographerTag);
        article.appendChild(photographerPrice);

        return (article);
    }
    return {portrait, name, city, country, tagline, price, getUserCardDOM }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

window.onload = function() {
    init();
}