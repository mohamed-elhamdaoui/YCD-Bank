let soldeVisible= true;

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

    const montant=document.getElementById('montantVirement').value;
    const description=document.getElementById('descriptionVirement').value;
    if (!montant || !description) {
        alert('Veuillez remplir tous les champs');
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
const popupForm= document.getElementById('formulaire');
popupForm.classList.add('hidden');
}
 