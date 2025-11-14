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

function afficherTaux(deviseSource, rates) {
    const container = document.getElementById("listeTaux");
    
    // Vider l'ancien affichage
    container.innerHTML = "";

    // Liste des devises qu'on veut afficher
    const devises = ["MAD", "EUR", "USD"];

    devises.forEach(devise => {
        if (rates[devise]) {

            // Calcul du taux inverse
            const taux = rates[devise];
            const tauxInverse = 1 / taux;

            // Création du bloc
            const div = document.createElement("div");
            div.className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg";

            div.innerHTML = `
                <span class="text-gray-700 font-medium">1 ${deviseSource}</span>
                <span class="text-gray-900 font-semibold">${taux.toFixed(4)} ${devise}</span>
            `;

            container.appendChild(div);

            // Bloc inverse (ex: 1 EUR = X MAD)
            if (devise !== deviseSource) {
                const inverseDiv = document.createElement("div");
                inverseDiv.className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg";

                inverseDiv.innerHTML = `
                    <span class="text-gray-700 font-medium">1 ${devise}</span>
                    <span class="text-gray-900 font-semibold">${tauxInverse.toFixed(4)} ${deviseSource}</span>
                `;

                container.appendChild(inverseDiv);
            }
        }
    });
}
