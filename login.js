class Person {
    fullName
    email
    password
    constructor(fullName, email, password) {
        this.fullName = fullName,
            this.email = email,
            this.password = password
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
    let password = document.getElementById("password");

    let usersFormStorage = JSON.parse(localStorage.getItem("users")) || []

    let savedUser = usersFormStorage.find((element) => element.email === email.value)
    if (savedUser?.email) {
        let para = document.getElementById("para")
        para.style.display = "block"
        para.innerHTML = "This user is already registered"
        fullName.value = "";
        email.value = "";
        password.value = "";
    } else {
        let newUser = new Person(fullName.value, email.value, password.value);
        usersFormStorage.push(newUser);
        console.log(usersFormStorage);
        localStorage.setItem("users", JSON.stringify(usersFormStorage))
        para.style.display = "none"
        fullName.value = ""
        email.value = ""
        password.value = ""
        Swal.fire({
            title: "Your account has been registered.",
            icon: "success",
            iconColor: "#005FD5",
            confirmButtonText: "Login Now",
            confirmButtonColor: "#007bff"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("login.html")
            }
        });
    }
}



function loginUser(event) {
    event.preventDefault();
    let email = document.getElementById("login-email");
    let password = document.getElementById("login-password");

    let usersFormStorage = JSON.parse(localStorage.getItem("users")) || []

    let savedUser = usersFormStorage.find((element) => element.email === email.value)

    if (savedUser?.email === email.value && savedUser?.password === password.value) {
        email.value = ""
        password.value = ""
        localStorage.setItem("loginUser", JSON.stringify(savedUser));
        window.location.assign("MainPage/index.html")
    } else {
        email.value = ""
        password.value = ""
        let incorrectPass = document.getElementById("incorrect-pass")
        incorrectPass.style.display = "block";
        incorrectPass.innerHTML = "Invalid credientials"

    }

}
