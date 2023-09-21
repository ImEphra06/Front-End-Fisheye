 async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    //et bien retourner le tableau photographers seulement une fois récupéré
    return (data.photographers)
}

function photographerTemplate(data) {
    const {portrait, name, city, country, tagline, price} = data;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const photographerimg = document.createElement("img");
        photographerimg.src = portrait;
        const photographername = document.createElement("h2");
        photographername.textContent = name;
        const photographerlocation = document.createElement("h3");
        photographerlocation.innerText = `${city}, ${country}`;
        const photographertag = document.createElement("h4");
        photographertag.textContent = tagline;
        const photographerprice = document.createElement("p");
        photographerprice.textContent = `${price}/jour`

        article.appendChild(photographerimg);
        article.appendChild(photographername);
        article.appendChild(photographerlocation);
        article.appendChild(photographertag);
        article.appendChild(photographerprice);

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