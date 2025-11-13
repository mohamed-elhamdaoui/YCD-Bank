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
}
    // initiallisation des soldes 
    document.getElementById('soldeEpargne').textContent=formatMontant(compteEpargneValue);
    document.getElementById('comptePrincipal').textContent=formatMontant(comptePrincipalValue);
    document.getElementById('totalComptes').textContent=formatMontant(compteEpargneValue+comptePrincipalValue);

 