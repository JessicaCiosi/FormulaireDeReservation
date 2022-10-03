function verif(){

var verifier = true;

/* Partie champs obligatoires */
   var nom = document.getElementById("nom");
   var mail = document.getElementById("mail");

   if(nom.value == ""){
       nom.style.borderColor = "red";
       alert("Veuillez saisir votre nom.");
       verifier = false;

   }else{
       nom.style.borderColor = "#ccc";
   }
/* Partie e-mail */
    var regExp = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;
   if(mail.value == ""){
       mail.style.borderColor = "red";
       alert("Veuillez saisir votre mail.");
       verifier = false;

   }else if(!regExp.test(mail.value)){
       mail.style.borderColor = "red";
       alert("Votre mail est invalide.");
       verifier = false;

   }else{
       mail.style.borderColor = "#ccc";
   }

/* Partie majuscules */
    var field = document.getElementById("nom");

    field.value = field.value.toUpperCase();

/* Case à cocher */
    var condition = document.getElementById("cG").checked;
    var labelCg = document.getElementById("labelCg");

    if(condition){
        labelCg.style.color = "black";
    }else{
        labelCg.style.color = "red";
        alert("Vous devez accepter les conditions générales.");
        verifier = false;
    }
    return verifier;
}

/* Impression du formulaire */
function imprimer(){
    window.print();
}

/* Verifier avant l'envoi */
function testVerif(){

    if(!verif()){
        alert("Veuillez vérifier votre formulaire avant l'envoi.");
    }else{
        document.getElementById("monForm").submit();
    }
}

/* Constantes */
const DEMIJOUR = 8;
const JOUR = 15;
const REPAS = 7;

function tarif(choix){

    var tarif;

    switch(choix){

        case "dj":
            tarif = DEMIJOUR;
            break;

        case "journee":
            tarif = JOUR;
            break;

        case "repas":
            tarif = REPAS;
            break;
    }

    return tarif;
}

function qtes(){

    var nbpers = document.getElementsByClassName("nbpers");
    var erreur = 0;

    for(var i = 0; i < nbpers.length; i++){

        var qte = nbpers[i].value;

        if(isNaN(qte)){
            erreur++; 
        }

    }

    if(erreur > 0){
        alert("Veuillez saisir les quantités en chiffre.");
        return false;
    }else{
        return true;
    }

}

function calcul(){

    var nbpers = document.getElementsByClassName("nbpers");
    var selects = document.getElementsByTagName("select");
    var sousTt = document.getElementsByClassName("sousTt");
    var stHT = 0;

    if(qtes()){

        for(var i = 0; i < nbpers.length; i++){

            var qte = nbpers[i].value;
            var prix = tarif(selects[i].value);
            var sousT = prix * qte;
            sousTt[i].value = sousT;
            stHT += sousT;
        }

    }

    document.getElementById("stHT").value = stHT;
    var totalTtc = (stHT * 1.2).toFixed(2);
    document.getElementById("ttc").value = totalTtc;

}



window.addEventListener("load", function(){
    document.getElementById("verif").addEventListener("click", verif);
    document.getElementById("imp").addEventListener("click", imprimer);
    document.getElementById("envoyer").addEventListener("click", testVerif);

    var selects = document.getElementsByTagName("select");

    for(var i = 0; i < selects.length; i++){
        selects[i].addEventListener("change", calcul);
    }



    var nbpers = document.getElementsByClassName("nbpers");

    for(var i = 0; i < nbpers.length; i++){
        nbpers[i].addEventListener("keyup", calcul);
    }

});