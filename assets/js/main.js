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

let isRegistre = false;
toggleForm.addEventListener("click", () => {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden")
    // toggleForm.classList.toggle("translate-x-10"); // Tailwind handles movement
    // toggleForm.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`; // dynamic color

    isRegistre = !isRegistre;
    if (isRegistre) {
        toggleForm.textContent = "login";
        leftTitle.textContent = "Welecome back!" 
        leftText.textContent = "Already have an account?"
    } else {
        toggleForm.textContent = "Register";
        leftTitle.textContent = "Hello, Welcome!" 
        leftText.textContent = "Don't have an account?"
    }
});


//login
const login_username = document.getElementById("login_username");
const login_password = document.getElementById("login_password");
//register
const register_username = document.getElementById("register_username");
const register_password = document.getElementById("register_password");
const register_email = document.getElementById("register_email");


let arr = localStorage.getItem("register") ;

if(arr === null) {
    arr = [];
}else {
    arr = JSON.parse(arr)
}
console.log(arr) 

let obj = {
    reg_username : register_username.value,
}

/* Aziz abada*/


/* mariem elhaimer*/