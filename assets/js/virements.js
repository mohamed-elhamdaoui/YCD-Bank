const currentUser = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("soldePrincipal").textContent =
    currentUser.comptePrincipal.soldePrincipal + " MAD";

document.getElementById("soldePrincipal2").textContent =
    currentUser.comptePrincipal.soldePrincipal + " MAD";

document.getElementById("soldeEpargne").textContent =
    currentUser.compteEprange.soldeEpargne + " MAD";

const tabBenef = document.getElementById("tab-beneficiaire");
const tabEpargne = document.getElementById("tab-epargne");
const secBenef = document.getElementById("section-beneficiaire");
const secEpargne = document.getElementById("section-epargne");

tabBenef.addEventListener("click", () => {
    tabBenef.classList.add("bg-white", "dark:bg-gray-900");
    tabEpargne.classList.remove("bg-white", "dark:bg-gray-900");

    secBenef.classList.remove("hidden");
    secEpargne.classList.add("hidden");
});

tabEpargne.addEventListener("click", () => {
    tabEpargne.classList.add("bg-white", "dark:bg-gray-900");
    tabBenef.classList.remove("bg-white", "dark:bg-gray-900");

    secBenefits.classList.add("hidden");
    secEpargne.classList.remove("hidden");
});

tabEpargne.addEventListener("click", () => {
    secBenef.classList.add("hidden");
    secEpargne.classList.remove("hidden");
});

function saveTransaction(type, montant, details = "") {
    const historique = JSON.parse(localStorage.getItem("historique")) || [];

    const transaction = {
        type,
        montant,
        details,
        date: new Date().toLocaleString()
    };

    historique.push(transaction);

    localStorage.setItem("historique", JSON.stringify(historique));
}



function loadBeneficiaires() {
    const beneficiaires = JSON.parse(localStorage.getItem("beneficiaires")) || [];
    const select = document.getElementById("selectBeneficiaire");

    select.innerHTML = `<option value="">Sélectionner un bénéficiaire</option>`;

    beneficiaires.forEach((b, i) => {
        if (!b.bloque) {
            select.innerHTML += `<option value="${i}">${b.nom} - ${b.iban}</option>`;
        }
    });
}
loadBeneficiaires();



document.getElementById("btnVirementBenef").addEventListener("click", () => {

    const index = document.getElementById("selectBeneficiaire").value;
    const montant = parseFloat(document.getElementById("montantBenef").value);

    if (!index) {
        return alert("Veuillez sélectionner un bénéficiaire.");
    }
    if (!montant || montant <= 0) {
        return alert("Montant invalide.");
    }

    if (montant > currentUser.comptePrincipal.soldePrincipal) {
        return alert("Solde insuffisant.");
    }

    currentUser.comptePrincipal.soldePrincipal -= montant;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));


    const beneficiaires = JSON.parse(localStorage.getItem("beneficiaires")) || [];
    const b = beneficiaires[index];
    saveTransaction("Virement vers bénéficiaire", montant, `${b.nom} - ${b.iban}`);

    alert("Virement effectué avec succès !");
    location.reload()


});

document.getElementById("btnVirementEpargne").addEventListener("click", () => {

    const montant = parseFloat(document.getElementById("montantEpargne").value);

    if (!montant || montant <= 0) return alert("Montant invalide.");

    if (montant > currentUser.comptePrincipal.soldePrincipal)
        return alert("Solde insuffisant.");

    currentUser.comptePrincipal.soldePrincipal -= montant;
    currentUser.compteEprange.soldeEpargne += montant;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    saveTransaction("Virement vers épargne", montant, "Transfert vers compte épargne");

    alert("Montant transféré vers l'épargne !");
    location.reload()
});

