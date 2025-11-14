
let solde = document.getElementById("solde")
let users = JSON.parse(localStorage.getItem("users"))
// console.log(users[0].comptePrincipal.soldePrincipal)
let savePay = document.getElementById("savePay")

solde.textContent = users[0].comptePrincipal.soldePrincipal

savePay.addEventListener("click", () => {
    let factureRef = document.getElementById("factureRef").value
    let montantFact = document.getElementById("montantFact").value
    console.log(montantFact)
    console.log(factureRef)


    let users = JSON.parse(localStorage.getItem("users"))
    let user = users[0]
    let newSold = Number(user.comptePrincipal.soldePrincipal)
    let factRes = newSold - Number(montantFact)
    user.comptePrincipal.soldePrincipal = factRes 
    console.log(factRes)
    // let fsctRes = Number(users[0].comptePrincipal.soldePrincipal) - 
    let solde = document.getElementById("solde")
    solde.textContent = factRes

    localStorage.setItem("users", JSON.stringify(users))


    let factures = JSON.parse(localStorage.getItem("factures")) || []

    let facture = {
        ref : factureRef ,
        montant : montantFact ,
        date : new Date()
    }

    factures.push(facture) ;
    localStorage.setItem("factures" , JSON.stringify(factures))



})