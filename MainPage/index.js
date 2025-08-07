class Post {
    constructor(content, owner) {
        this.content = content
        this.owner = owner
        this.createdAt = new Date().toISOString();
        this.likes = 0
        this.comments = []
    }
    increaseLike() {
        this.likes++
    }

}



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

function addUserName() {
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





const loggedInUser = JSON.parse(localStorage.getItem("loginUser")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];

function showFriends() {
    document.getElementById("friends-container").innerHTML = "";
    const friend = users.filter((user) => user.id !== loggedInUser.id)
    console.log(friend)
    friend.map((element) => {
        const isMyFriend = (loggedInUser.friends || []).includes(element.id)
        console.log(isMyFriend);
        document.getElementById("friends-container").innerHTML += `
        <div class="friend-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHgjCOoJ_d6n-PjKd4FwKzXgXKQ-rK9BYYkg&s" class="friend-img" />
            <h3>${element.fullName}</h3>
            ${isMyFriend ? `<button id="friend-btn">Friend</button>
                <button class="remove-btn" onClick="unFriend(${element.id} , ${loggedInUser.id})">Unfriend</button>` : `
                    <button class="add-btn" onClick="addFriend(${element.id}, ${loggedInUser.id})">Add friend</button>
                    <button class="remove-btn">Remove</button>`
            }
        </div>`;
    })
}
showFriends();


function addFriend(friendId, userId) {
    console.log(friendId)

    if (!Array.isArray(loggedInUser.friends)) {
        loggedInUser.friends = [];
    }

    if (!loggedInUser.friends.includes(friendId)) {
        loggedInUser.friends.push(friendId);
    }
    console.log(loggedInUser)
    localStorage.setItem("loginUser", JSON.stringify(loggedInUser))
    users[userId - 1] = loggedInUser
    localStorage.setItem("users", JSON.stringify(users))
    console.log(users)
    showFriends();
}



function unFriend(removeFriendId, userId) {

    const index = loggedInUser.friends.indexOf(removeFriendId)
    if (index !== -1) {
        loggedInUser.friends.splice(index, 1)
    }

    localStorage.setItem("loginUser", JSON.stringify(loggedInUser));

    users[userId - 1] = loggedInUser;
    localStorage.setItem("users", JSON.stringify(users));
    showFriends();
}


function createdPost() {
    let publishedPostBtn = document.getElementById("published-post")
    let inputPost = document.getElementById("post-input")
    let owner = JSON.parse(localStorage.getItem("loginUser"))
    delete owner.password
    let post = new Post(inputPost.value, owner)
    let freshOwner = JSON.parse(localStorage.getItem("loginUser"))
    freshOwner.myPosts.push(post);
    localStorage.setItem('loginUser', JSON.stringify(freshOwner));
    
    console.log(freshOwner)
    inputPost.value = ""
    showPost()
}


function showPost() {
    let user = JSON.parse(localStorage.getItem("loginUser"))
    let postFeedContainer = document.getElementById("posts-feed-container")

    user.myPosts.reverse().map((post) => {
        postFeedContainer.innerHTML = "";
        postFeedContainer.innerHTML += `<div class="post-header">
                    <div class="profile-img"></div>
                    <div class="user-info">
                        <h4>Taha Bin Shafiq</h4>
                        <span>2 hrs ago</span>
                    </div>
                </div>

                <div class="post-content">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*LyZcwuLWv2FArOumCxobpA.png"
                        alt="post image" />
                </div>

                <div class="post-actions">
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        Like</button>
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                        Comment</button>
                    <button><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            height="20px" width="20px" version="1.1" id="_x32_" viewBox="0 0 512 512"
                            xml:space="preserve">
                            <style type="text/css">
                                .st0 {
                                    fill: #000000;
                                }
                            </style>
                            <g>
                                <path class="st0"
                                    d="M512,230.431L283.498,44.621v94.807C60.776,141.244-21.842,307.324,4.826,467.379   c48.696-99.493,149.915-138.677,278.672-143.14v92.003L512,230.431z" />
                            </g>
                        </svg> Share</button>
                </div>`

    })
}
showPost();