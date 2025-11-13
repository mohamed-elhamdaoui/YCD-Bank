document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;

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
        const icon = btn.querySelector("i");

        if (soldeEl.textContent.includes("*")) {
            soldeEl.textContent = soldeEl.dataset.value;
            icon.classList.remove("bx-low-vision");
            icon.classList.add("bx-show");
        } else {
            soldeEl.textContent = "***********";
            icon.classList.remove("bx-show");
            icon.classList.add("bx-low-vision");
        }
    });
});


    const btnDownloadRib = document.getElementById("download-rib");

    btnDownloadRib.addEventListener("click", async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        const logoPath = "../assets/img/logo.png";

        const toDataURL = (url) =>
            fetch(url)
                .then((response) => response.blob())
                .then(
                    (blob) =>
                        new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.readAsDataURL(blob);
                        })
                );

        const logoData = await toDataURL(logoPath);

        const img = new Image();
        img.src = logoData;

        await new Promise((resolve) => {
            img.onload = () => resolve();
        });

        const maxWidth = 35;
        const ratio = img.width / img.height;
        const width = maxWidth;
        const height = maxWidth / ratio;

        doc.addImage(logoData, "PNG", 20, 30, width, height);

        const titleY = 30 + height + 15; 
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Relevé d'Identité Bancaire (RIB)", 20, titleY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        let startY = titleY + 20;
        const lineHeight = 10;

        doc.text(`Titulaire du compte : ${currentUser.username}`, 20, startY);
        doc.text(`Email : ${currentUser.email}`, 20, startY + lineHeight);
        doc.text(`Type de compte : Compte Principal`, 20, startY + lineHeight * 2);
        doc.text(`Solde actuel : ${currentUser.comptePrincipal.soldePrincipal} DH`, 20, startY + lineHeight * 3);
        doc.text(`RIB : ${currentUser.comptePrincipal.ribPrincipale}`, 20, startY + lineHeight * 4);
        doc.text(`Date de génération : ${new Date().toLocaleDateString()}`, 20, startY + lineHeight * 6);

        doc.save(`RIB_${currentUser.username}.pdf`);
    });



});

