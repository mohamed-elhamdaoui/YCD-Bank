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
    let id = Date.now();
    // let operateur = operateur.value;
    let opppTele = operateur.value;
    let libelleTele = libbele.value;
    let numTele = num.value;
    console.log(opppTele)
    console.log(libelleTele)
    console.log(numTele)



    const bloc = `<div id=${id} class="h-fit p-4 bg-white w-[45%] rounded-2xl relative">
                                <div>
                                    <span>${libelleTele}</span>
                                    <span class="border border-black rounded-lg p-1 text-sm">${opppTele}</span>
                                </div>
                                <p class="text-gray-500">${numTele}</p>
                                <span onclick="deleteElem(${id})" class="absolute right-7 inset-y-0 top-1/2 -translate-y-1/2 cursor-pointer">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>`


    const favoriSpace = document.getElementById("favoriSpace");
    const favBloc = document.getElementById("favBloc");


    favBloc.insertAdjacentHTML("afterbegin", bloc);

    favoriSpace.classList.remove("hidden");
    const aucunNum = document.getElementById("aucunNum");
    if (!aucunNum.classList.contains("hidden")) {
        aucunNum.classList.add("hidden");

    }

    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    console.log(favoris);


    let favori = {
        operateur: opppTele,
        numero: numTele,
        libelle: libelleTele,
        id: id
    }

    favoris.push(favori);
    localStorage.setItem("favoris", JSON.stringify(favoris));


    popup.classList.add("invisible");

});

let add = document.querySelectorAll(".addFav")
console.log(add);

add.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn)

        popup.classList.remove("invisible");
    })
})



function loadData() {

    const favoriSpace = document.getElementById("favoriSpace");
    const favBloc = document.getElementById("favBloc");
    const aucunNum = document.getElementById("aucunNum");
    let fav = JSON.parse(localStorage.getItem("favoris"));

    favBloc.innerHTML = "";

    console.log(fav.length)
    if (fav.length === 0) {
        favoriSpace.classList.add("hidden");
        aucunNum.classList.remove("hidden");
        return
    }

    favoriSpace.classList.remove("hidden");
    aucunNum.classList.add("hidden");
    // fav.forEach(ele => {

    //     console.log(ele.id)
    // });

    // console.log(fav[1].id);


    fav.forEach(element => {

        const bloc = `<div id="${element.id}" class="h-fit p-4 bg-white w-[45%] rounded-2xl relative">
                                <div>
                                    <span>${element.libelle}</span>
                                    <span class="border border-black rounded-lg p-1 text-sm">${element.operateur}</span>
                                </div>
                                <p class="text-gray-500">${element.numero}</p>
                                <span onclick="deleteElem(${element.id})" class="absolute right-7 inset-y-0 top-1/2 -translate-y-1/2 cursor-pointer">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>`


        favBloc.insertAdjacentHTML("afterbegin", bloc);
    });

}

loadData();
// let fav = JSON.parse(localStorage.getItem("favoris"));
// console.log(fav) 
// // let isFavori = false
// if (fav && fav.length > 0) {
//     loadData();
//     const favoriSpace = document.getElementById("favoriSpace");
//     const aucunNum = document.getElementById("aucunNum");
//     favoriSpace.classList.remove("hidden")
//     aucunNum.classList.add("hidden");
// } 










const solde = document.getElementById("solde");
let arr = JSON.parse(localStorage.getItem("users"))
console.log()
solde.textContent = arr[0].comptePrincipal.soldePrincipal
// solde.textContent =Number(solde.textContent ) + 200 ;




// delete element ; 



function deleteElem(id) {
    let newArray = []
    // let data = JSON.parse(localStorage.getItem("favoris"))
    let data = JSON.parse(localStorage.getItem("favoris"));
    for (let index = 0; index < data.length; index++) {
        if (data[index].id !== id) {
            newArray.push(data[index]);
        }
    }

    console.log(newArray)
    localStorage.setItem("favoris", JSON.stringify(newArray));

    loadData();


}



const favBloc = Array.from(document.getElementById("favBloc").children)

favBloc.forEach(element => {
    element.addEventListener("click", (e) => {
        // console.log(e.target.children[0].children[1].textContent)
        // console.log(e.target.children[1].textContent)
        let operation = document.getElementById("operation")
        let numeroTel = document.getElementById("numeroTel");
        numeroTel.focus()
        operation.focus()
        numeroTel.value = Number(e.target.children[1].textContent);
        operation.value = e.target.children[0].children[1].textContent;
        // console.log(numeroTel.value)
        // operation = e.target.children[0].children[1].textContent
    })
});


const btns = Array.from(document.getElementById("btnParent").children)
// console.log(btns[0])

btns.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element.textContent)
        let mntantPrsnl = document.getElementById("mntantPrsnl");
        mntantPrsnl.focus();
        mntantPrsnl.value = element.textContent;
        btns.forEach((btn) => {
            if (btn.classList.contains('bg-white')) {
                btn.classList.remove('bg-white')
            }
        })

        element.classList.add('bg-white')


        console.log(mntantPrsnl)
    })
});


const saveRecharge = document.getElementById("saveRecharge");

saveRecharge.addEventListener("click", () => {
    let mntantPrsnl = document.getElementById("mntantPrsnl").value;
    let operation = document.getElementById("operation").value;
    let numeroTel = document.getElementById("numeroTel").value;

    console.log(operation);
    console.log(numeroTel);
    console.log(mntantPrsnl);

    let recharge = {
        operateur: operation,
        numero: numeroTel,
        montant: mntantPrsnl,
        date: new Date()
    }

    const recharges = JSON.parse(localStorage.getItem("recharges")) || [];
    console.log(recharges)

    recharges.push(recharge);

    localStorage.setItem("recharges", JSON.stringify(recharges))

    let users = JSON.parse(localStorage.getItem("users"))

    let user = users[0]

    let solde = Number(user.comptePrincipal.soldePrincipal) - Number(mntantPrsnl)
    console.log(solde)
    console.log(user.comptePrincipal.soldePrincipal)
    console.log(mntantPrsnl)

    user.comptePrincipal.soldePrincipal = solde
    console.log(user.comptePrincipal.soldePrincipal);
    console.log(user);

    localStorage.setItem("users", JSON.stringify(users))

    const soldCntnt = document.getElementById("solde");
    // let arr = JSON.parse(localStorage.getItem("users")) || []
    // console.log()
    soldCntnt.textContent = solde



})

// let users = JSON.parse(localStorage.getItem("users"))

// let mntantPrsnl = document.getElementById("mntantPrsnl")
// mntantPrsnl.addEventListener("input", () => {

//     // console.log(mntantPrsnl)
//     if (users.length > 0) {
//         let user = users[0]
//         let rchrg = mntantPrsnl.value
//         let solde = +(user.comptePrincipal.soldePrincipal) - +(rchrg)
//         console.log(solde)

//         user.comptePrincipal.soldePrincipal = solde

//         localStorage.setItem("users", JSON.stringify(users))

//     }
// })







// let operation = document.getElementById("operation")
// let numeroTel = document.getElementById("numeroTel");

// console.log(operation.value)
// Array.from(favoriSpace).forEach(element => {
// });




