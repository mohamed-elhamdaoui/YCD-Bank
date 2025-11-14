document.getElementById('btnCalculer').addEventListener("click", function (){
    const deviseSource = document.getElementById("deviseSource").value;
    const deviseCible = document.getElementById("deviseCible").value;
    const montantSource = parseFloat(document.getElementById("montantSource").value);

    if (isNaN(montantSource) || montantSource <= 0) {
        alert("Veuillez entrer un montant valide !");
        return;
    }
    const url = `https://open.er-api.com/v6/latest/${deviseSource}`;

    fetch(url)
    .then(response=>{
        if (!response.ok){
            throw new Error("Erreur API "+ response.status);
        }
        return response.json()
    })
    .then(data =>{
        console.log("Réponse API : ",data);
        // vérifie si la devise cible existe
        if(!data.rates[deviseCible]){
            alert("Taux non disponible !");
            return;
        }

        const taux = data.rates[deviseCible];
        const montantConverti = montantSource * taux;

        // affichage
        document.getElementById("montantCible").value = montantConverti.toFixed(2);
         document.getElementById("tauxChange").textContent =
                `1 ${deviseSource} = ${taux.toFixed(4)} ${deviseCible}`;
    
    })
    .catch(error => {
            console.error("Erreur lors du fetch :", error);
            alert("Erreur lors de la récupération du taux de change !");
        });
})