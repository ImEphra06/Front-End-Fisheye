function displayModal() {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.querySelector(".modal").style.display = "block";
    document.getElementsByClassName("contact-button")[0].style.display = "none";
    document.getElementById("contact-name").innerHTML = photographer.name;
    
    /***** Gestion des flèches du clavier *****/
    const actionForm = document.querySelectorAll('.action-form');
    actionForm.forEach(function (action, i) {
        if (document.querySelector(".modal").style.display === "block") {
            action.addEventListener('keydown', function (events) {
                switch (events.key) {
                    case 'ArrowUp':
                        if (i !== 0) {
                            action.parentNode.getElementsByClassName('action-form')[i - 1].focus()
                        }
                        break;
                    case 'ArrowDown':
                        if (i !== (actionForm.length - 1)) {
                            action.parentNode.getElementsByClassName('action-form')[i + 1].focus()
                        }
                        break;
                    default:
                        break;
                }
            })
        }
    });
}

function closeModal() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.querySelector(".modal").style.display = "none";
    document.getElementsByClassName("contact-button")[0].style.display = "block";
}

function validContact() {
    let nom = document.getElementById("form-name").value;
    let prenom = document.getElementById("form-lastname").value;
    let email = document.getElementById("form-email").value;
    let message = document.getElementById("form-message").value;

    console.log("NOM : " + nom + " PRENOM : " + prenom);
    console.log("ADRESSE EMAIL : " + email);
    console.log("MESSAGE : " + message);

    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.querySelector(".modal").style.display = "none";
    document.getElementsByClassName("contact-button")[0].style.display = "block";
}