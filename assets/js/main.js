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

    let regUsernameInput = register_username.value.trim();
    let regPasswordInput = register_password.value.trim();
    let regEmailInput = register_email.value.trim();

    // console.log(regUsername) ;
    // console.log(regPassword) ;
    // console.log(regEmail) ;

    usernameRegex = /^[a-zA-Z]{3,15}$/;
    emailRegex = /^[A-Za-z0-9]{3,}@gmail\.com$/g;
    passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/;

    console.log(regEmailInput.match(emailRegex));
    if (!regEmailInput.match(emailRegex)) {
        alert("Invalid email format!");

        return
    }
    if (!regUsernameInput.match(usernameRegex)) {
        alert("Username must be 3–15 characters (letters, numbers)");
        return
    }
    if (!regPasswordInput.match(passwordRegex)) {
        alert(" Password must have upper/lowercase, number, and 8+ chars.!");
        return
    }



    let arr = localStorage.getItem("users");

    if (arr === null) {
        arr = [];
    } else {
        arr = JSON.parse(arr);
    }
    // console.log(arr)

    const userExist = arr.some(user => user.regUsername === regUsernameInput || user.regEmail === regEmailInput)
    if (userExist) {
        alert("Username or email already exists! Please choose another.");
        return;
    }


    let ribPrefix = "786765";
    let ribSoufix = "89";
    let ribPrincipale;
    let randomPart = ""
    for (let index = 0; index < 16; index++) {
        randomPart += Math.floor(Math.random() * 10);
        // console.log(randomPart);
    }

    ribPrincipale = ribPrefix + randomPart + ribSoufix;

    let ribEprangePrefix = "654321";
    let ribEprangeSoufix = "77";
    let ribEprange;
    let randomEprangePart = ""
    for (let index = 0; index < 16; index++) {
        randomEprangePart += Math.floor(Math.random() * 10);
        // console.log(randomPart);
    }

    ribEprange = ribEprangePrefix + randomEprangePart + ribEprangeSoufix;
    // console.log(ribPrincipale);


    let user = {
        username: regUsernameInput,
        password: regPasswordInput,
        email: regEmailInput,
        ribPrincipale: ribPrincipale,
        ribEpargne: ribEprange,
    }

    arr.push(user);
    localStorage.setItem("users", JSON.stringify(arr))
    // console.log(arr)


    isRegistre = !isRegistre;

    localStorage.setItem("isRegistre", JSON.stringify(isRegistre))
    updateUi();

    register_username.value = "";
    register_password.value = "";
    register_email.value = "";





})


const arr = JSON.parse(localStorage.getItem("users"));

console.log(arr)

// console.log(localStorage.getItem("register"))
// console.log(JSON.parse(localStorage.getItem("isRegister")))




/* Aziz abada*/


/* mariem elhaimer*/