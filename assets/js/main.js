/* Mohamed elhamdaoui*/

//     let obj = {
//     prenom : "momo" ,
//     city : "kech"  
// }



// for(const key in obj)
//     console.log(obj[key]);

const toggleForm = document.getElementById("toggleForm");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const leftTitle = document.getElementById("leftTitle");
const leftText = document.getElementById("leftText");

// let isRegistre = false;
// toggleForm.addEventListener("click", () => {
//     loginForm.classList.toggle("hidden");
//     registerForm.classList.toggle("hidden")
//     // toggleForm.classList.toggle("translate-x-10"); // Tailwind handles movement
//     // toggleForm.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`; // dynamic color

//     isRegistre = !isRegistre;
//     if (isRegistre) {
//         toggleForm.textContent = "login";
//         leftTitle.textContent = "Welecome back!"
//         leftText.textContent = "Already have an account?"
//     } else {
//         toggleForm.textContent = "Register";
//         leftTitle.textContent = "Hello, Welcome!"
//         leftText.textContent = "Don't have an account?"
//     }
// });
let isRegistre = JSON.parse(localStorage.getItem("isRegistre")) || false;


function updateUi() {
    if (isRegistre) {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden")
        toggleForm.textContent = "login";
        leftTitle.textContent = "Welecome back!"
        leftText.textContent = "Already have an account?"
    } else {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden")
        toggleForm.textContent = "Register";
        leftTitle.textContent = "Hello, Welcome!"
        leftText.textContent = "Don't have an account?"
    }
}

updateUi();


toggleForm.addEventListener("click", () => {

    isRegistre = !isRegistre;

    localStorage.setItem("isRegistre", JSON.stringify(isRegistre))

    updateUi()

    // toggleForm.classList.toggle("translate-x-10"); // Tailwind handles movement
    // toggleForm.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`; // dynamic color



});


//login
const login_username = document.getElementById("login_username");
const login_password = document.getElementById("login_password");
//register
const register_username = document.getElementById("register_username");
const register_password = document.getElementById("register_password");
const register_email = document.getElementById("register_email");


const save_register = document.getElementById("save_register");

save_register.addEventListener("click", () => {

    let regUsername = register_username.value;
    let regPassword = register_password.value;
    let regEmail = register_email.value;

    console.log(regUsername)
    console.log(regPassword)
    console.log(regEmail)

    let arr = localStorage.getItem("register");

    if (arr === null) {
        arr = [];
    } else {
        arr = JSON.parse(arr)
    }
    console.log(arr)

    let obj = {
        regUsername: regUsername,
        regPassword: regPassword,
        regEmail: regEmail
    }

    arr.push(obj);
    localStorage.setItem("register", JSON.stringify(arr))
    console.log(arr)
    

    isRegistre = !isRegistre;

    localStorage.setItem("isRegistre", JSON.stringify(isRegistre))
    updateUi() ;

    register_username.value = "";
    register_password.value = "";
    register_email.value = "";





})

// console.log(localStorage.getItem("register"))
// console.log(JSON.parse(localStorage.getItem("isRegister")))



/* Aziz abada*/


/* mariem elhaimer*/