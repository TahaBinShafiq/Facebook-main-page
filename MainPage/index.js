checkUserLogin()

const dropdown = document.getElementById("dropdown");
const profileIcon = document.getElementById("profile-icon");

function toggleDropdown() {
    dropdown.classList.toggle("show");
}

window.addEventListener("click", function (e) {
    if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
    }
});



function checkUserLogin() {
    let loggedInUser = JSON.parse(localStorage.getItem("loginUser"))
    if (!loggedInUser) {
        Swal.fire({
            title: "Please Login",
            icon: "warning",
            confirmButtonText: "Login Now",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        }).then(() => {
            window.location.assign("../index.html")
        })
    }
}

console.log("hellow")
checkUserLogin();
