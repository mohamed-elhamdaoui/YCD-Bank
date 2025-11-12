let soldeVisible= true;

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
    const popupForm= document.getElementById('')
})
 