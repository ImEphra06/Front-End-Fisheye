async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = await response.json();
    /* et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: [...photographers]
    })*/
}

const article = document.createElement( 'article' );
const img = document.createElement( 'img' );
img.setAttribute("src", picture)
const h2 = document.createElement( 'h2' );
h2.textContent = name;
article.appendChild(img);
article.appendChild(h2);


/*function getPhotographers() {
    let photographers = fetch('photographers.json')
        .then(res => res.text())
        .then(body => console.log(body))
        .catch(err => console.log('erreur', err))
    return ({
        photographers})
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}*/

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

