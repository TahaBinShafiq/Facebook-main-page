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

function addUserName(){
    let loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
    let userName = document.getElementById("userName")
    userName.innerHTML = loggedInUser.fullName
}

addUserName()


function checkUserLogin() {
    let loggedInUser = JSON.parse(localStorage.getItem("loginUser"))
    if (!loggedInUser) {
        Swal.fire({
            title: "Please Login",
            icon: "warning",
            confirmButtonText: "Login Now",
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign("../index.html")
            }
        })
    }
}
window.addEventListener("DOMContentLoaded", checkUserLogin);

function logoutUser() {
    localStorage.removeItem("loginUser");
    window.location.assign("../index.html");
}
