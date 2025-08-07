const loggedInUser = JSON.parse(localStorage.getItem("loginUser")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];


function addUserName() {
    let loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
    let userName = document.getElementById("userName")
    userName.innerHTML = loggedInUser.fullName
}

addUserName()

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


document.addEventListener("DOMContentLoaded", function () {
    showFriends(); // ← yahan safe chalega
});



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

