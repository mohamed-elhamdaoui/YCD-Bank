document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Aucun utilisateur connecté !");
        window.location = "/Pages/login.html";
        return;
    }

    const soldePrincipalEl = document.getElementById("solde-principal");
    const ribPrincipalEl = document.getElementById("rib-principal");
    const soldeEpargneEl = document.getElementById("solde-epargne");
    const ribEpargneEl = document.getElementById("rib-epargne");

    soldePrincipalEl.dataset.value = currentUser.comptePrincipal.soldePrincipal + " DH";
    ribPrincipalEl.textContent = currentUser.comptePrincipal.ribPrincipale;
    soldeEpargneEl.dataset.value = currentUser.compteEprange.soldeEpargne + " DH";
    ribEpargneEl.textContent = currentUser.compteEprange.ribEpargne;


    soldePrincipalEl.textContent = "***********";
    soldeEpargneEl.textContent = "***********";

    const toggleButtons = document.querySelectorAll(".toggle-solde");

    toggleButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const soldeEl = index === 0 ? soldePrincipalEl : soldeEpargneEl;

            if (soldeEl.textContent.includes("*")) {
                soldeEl.textContent = soldeEl.dataset.value;
            } else {
                soldeEl.textContent = "***********";
            }
        });
    });

});
