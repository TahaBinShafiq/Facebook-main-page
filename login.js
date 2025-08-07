let passInput = document.getElementById("loginPassword");
let passEye = document.getElementById("eye-img");
let NewPasswordEyeImg = document.getElementById("new-eye-img")
let NewPasswordInp = document.getElementById("NewPasswordInput")

function passwordTypeChnge() {
    if (passInput && passEye) {
        if (passInput.type === "password") {
            passInput.type = "text";
            passEye.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
        } else {
            passInput.type = "password";
            passEye.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png";
        }
    }

    if (NewPasswordInp && NewPasswordEyeImg) {
        if (NewPasswordInp.type === "password") {
            NewPasswordInp.type = "text";
            NewPasswordEyeImg.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
        } else {
            NewPasswordInp.type = "password";
            NewPasswordEyeImg.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png";
        }
    }
};



class Person {
    fullName
    email
    password
    id
    friends
    createdAt
    myPosts
    constructor(fullName, email, password, id) {
        this.fullName = fullName
        this.email = email
        this.password = password
        this.id = id
        this.friends = []
        this.createdAt = new Date().toISOString();
        this.myPosts = []
    }
}


function resgisterUser(event) {
    event.preventDefault();

    let form = document.getElementById("registerForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    let fullName = document.getElementById("fullName");
    let email = document.getElementById("email");
    let para = document.getElementById("para")

    let usersFormStorage = JSON.parse(localStorage.getItem("users")) || []
    let savedUser = usersFormStorage.find((element) => element.email === email.value)

    if (savedUser?.email) {
        para.style.display = "block"
        para.innerHTML = "This user is already registered"
        fullName.value = "";
        email.value = "";
        NewPasswordInp.value = "";
    } else {
        let newId = usersFormStorage.length + 1;
        let newUser = new Person(fullName.value, email.value, NewPasswordInp.value, newId);
        usersFormStorage.push(newUser);
        console.log(usersFormStorage);
        localStorage.setItem("users", JSON.stringify(usersFormStorage))
        para.style.display = "none"
        fullName.value = ""
        email.value = ""
        NewPasswordInp.value = ""
        Swal.fire({
            title: "Your account has been registered.",
            icon: "success",
            iconColor: "#005FD5",
            confirmButtonText: "Login Now",
            confirmButtonColor: "#007bff"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("index.html")
            }
        });
    }
}



function loginUser(event) {
    event.preventDefault();
    let email = document.getElementById("login-email");


    let usersFormStorage = JSON.parse(localStorage.getItem("users")) || []

    let savedUser = usersFormStorage.find((element) => element.email === email.value)

    if (savedUser?.email === email.value && savedUser?.password === passInput.value) {
        if (!Array.isArray(savedUser.friends)) {
            savedUser.friends = [];
        }
        email.value = ""
        passInput.value = ""
        localStorage.setItem("loginUser", JSON.stringify(savedUser));
        window.location.assign("MainPage/index.html")
    } else {
        email.value = ""
        passInput.value = ""
        let incorrectPass = document.getElementById("incorrect-pass")
        incorrectPass.style.display = "block";
        incorrectPass.innerHTML = "Invalid credientials"

    }

}
