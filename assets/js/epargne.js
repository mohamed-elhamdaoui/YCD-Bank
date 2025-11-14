let soldeVisible= true;
let compteEpargneValue= 80000000000;
let comptePrincipalValue= 20000;

function formatMontant(montant) {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD'
        }).format(montant).replace('MAD', 'MAD');
}

     
window.onload=function(){
    this.document.querySelector('form').onsubmit= enregistrerVirementEpargne;

}

document.getElementById('toggleSolde').addEventListener('click', function () {
    soldeVisible=!soldeVisible;
    const soldeEpargne=document.getElementById('soldeEpargne');
    const soldeMasque=document.getElementById('soldeMasque');
    const iconEye= document.getElementById('eyeIcon');
    if(soldeVisible){
        soldeEpargne.classList.remove('hidden');
        soldeMasque.classList.add('hidden');
        iconEye.classList.remove('bx-hide');
        iconEye.classList.add('bx-show');
    }else{
        soldeEpargne.classList.add('hidden');
        soldeMasque.classList.remove('hidden');
        iconEye.classList.add('bx-hide');
        iconEye.classList.remove('bx-show');
    }
})
document.getElementById('btnVirement').addEventListener('click', function(){
    const popupForm= document.getElementById('formulaire');
    popupForm.classList.remove('hidden');
})
document.getElementById('closePopup').addEventListener('click', function(){
    const popupForm= document.getElementById('formulaire');
    popupForm.classList.add('hidden');
})
document.getElementById('cancelBtn').addEventListener('click', function(){
    const popupForm= document.getElementById('formulaire');
    popupForm.classList.add('hidden');
})


function enregistrerVirementEpargne(e){
    e.preventDefault();

    const montant= parseFloat(document.getElementById('montantVirement').value);
    const description=document.getElementById('descriptionVirement').value;
    if (!montant || !description) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (montant > compteEpargneValue){
        alert('le solde n est pas suffisant pour ce virement' )
    }
    if (montant <= 0){
        alert('Le montant doit etre supérieur à 0' )
    }
    

    // Validation Regex pour le montant
            const montantRegex = /^\d+(\.\d{1,2})?$/;
            if (!montantRegex.test(montant)) {
                alert('Format de montant invalide')    
                return;
            }

    const virment = JSON.parse(localStorage.getItem("virement"))  || []
    
    console.log(virment) ;

    const virementEpargne= {
        description: "virement_vers_principal",
        montant: montant,
        date: new Date().toLocaleString()
    }

    virment.push(virementEpargne) ;

    localStorage.setItem("virement",JSON.stringify(virment))


    // Calcule à nouveau des soldes
    compteEpargneValue-=montant;
    comptePrincipalValue+=montant;

    // Mettre à jour l'affichage
    document.getElementById('soldeEpargne').textContent=formatMontant(compteEpargneValue);
    document.getElementById('comptePrincipal').textContent=formatMontant(comptePrincipalValue);
    document.getElementById('totalComptes').textContent=formatMontant(compteEpargneValue+comptePrincipalValue);


const popupForm= document.getElementById('formulaire');
popupForm.classList.add('hidden');
document.getElementById('formulaire').reset();

}
    // initiallisation des soldes 
    document.getElementById('soldeEpargne').textContent=formatMontant(compteEpargneValue);
    document.getElementById('comptePrincipal').textContent=formatMontant(comptePrincipalValue);
    document.getElementById('totalComptes').textContent=formatMontant(compteEpargneValue+comptePrincipalValue);

    //exporter le rib en pdf 
        document.getElementById('btnExportRib').addEventListener('click', function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(20);
            doc.text('YCD BANK', 105, 20, { align: 'center' });

            doc.setFontSize(16);
            doc.text('Relevé d\'Identité Bancaire (RIB)', 105, 35, { align: 'center' });

            doc.setFontSize(12);
            doc.text('Compte Épargne', 20, 60);
            doc.setFontSize(10);
            doc.text('Titulaire: Nom Prénom', 20, 70);
            doc.text('Date d\'édition: ' + new Date().toLocaleDateString('fr-FR'), 20, 80);

            doc.setFontSize(12);
            doc.text('Informations bancaires:', 20, 100);
            doc.setFontSize(10);
            doc.text('RIB: ' + document.getElementById('ribEpargne').textContent, 20, 110);
            doc.text('Numéro de compte: ' + document.getElementById('numeroCompte').textContent, 20, 120);

            doc.setFontSize(8);
            doc.text('Ce document est généré automatiquement par YCD Bank', 105, 280, { align: 'center' });

            doc.save('RIB_Compte_Epargne.pdf');
        });
        
        //affichage correct du rib et du numero de compte
        let RibEpargne= document.getElementById('ribEpargne');
