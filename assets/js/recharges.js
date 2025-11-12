const popup = document.getElementById("popup")
const addFav = document.getElementById("addFav");

// addFav.addEventListener("click", () => {
//     popup.classList.remove("invisible");
// })

const closepop = document.getElementById("close");
closepop.addEventListener("click", () => {
    popup.classList.add("invisible")
})



const operateur = document.getElementById("operateur");
const num = document.getElementById("num");
const libbele = document.getElementById("libbele");
const save = document.getElementById("save");

// console.log(save);
// console.log(num);
// console.log(libbele);
// console.log(operateur);

save.addEventListener("click", () => {
    popup.classList.remove("invisible");
    
    // let operateur = operateur.value;
    let opppTele = operateur.value;
    let libelleTele = libbele.value;
    let numTele = num.value;
    console.log(opppTele)
    console.log(libelleTele)
    console.log(numTele)

    

    const bloc = `<div class="h-fit p-4 bg-white w-[45%] rounded-2xl relative">
                                <div>
                                    <span>${libelleTele}</span>
                                    <span class="border border-black rounded-lg p-1 text-sm">${opppTele}</span>
                                </div>
                                <p class="text-gray-500">${numTele}</p>
                                <span class="absolute right-7 inset-y-0 top-1/2 -translate-y-1/2 cursor-pointer">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>`


    const favoriSpace = document.getElementById("favoriSpace") ;
    const favBloc = document.getElementById("favBloc") ;


    favBloc.insertAdjacentHTML("afterbegin",bloc);

    favoriSpace.classList.remove("hidden") ;
    const aucunNum = document.getElementById("aucunNum");
    if(!aucunNum.classList.contains("hidden")) {
        aucunNum.classList.add("hidden");

    }
    
    popup.classList.add("invisible");
    
});

let add = document.querySelectorAll(".addFav")
console.log(add);

add.forEach((btn)=> {
    btn.addEventListener("click",()=> {
            console.log(btn)

        popup.classList.remove("invisible");
    })
} )


const solde = document.getElementById("solde") ;
let arr =JSON.parse(localStorage.getItem("users")) || [] 
console.log()
solde.textContent = arr[0].comptePrincipal.soldePrincipal
// solde.textContent =Number(solde.textContent ) + 200 ;
