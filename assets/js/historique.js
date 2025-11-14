let tableHistorique= JSON.parse(localStorage.getItem('historique')) || [];
console.log(tableHistorique)


let zone= document.getElementById('carte-affichage');

let html=``;

for(let i=0; i<tableHistorique.length ; i++){
    const V = tableHistorique[i];
    
    html+=`<div class="flex justify-between text-center  border-4  shadow-md rounded-xl bg-red-100 w-[90%] py-3 px-12 dark:bg-gray-900 dark:text-white">
            <div class="flex flex-col justify-start">
                <div class="text-[120%] font-bold mb-3 ">${V.type}</div>
                <div class="text-[70%]  mb-2">${V.date}</div>
            </div>
            
                <div class="text-[130%] font-bold ">${V.montant} MAD</div>
            
        </div> `
    
}
zone.innerHTML=html;

