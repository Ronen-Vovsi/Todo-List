const userInputBox = document.getElementById("Username");
const passInputBox = document.getElementById("Password");

/* Function to login */
function signUp() {
/*--------------- Alert if username input is empty ---------------*/
        if (userInputBox.value == '' || passInputBox.value == ''){
                alert("Username or password is empty.");
        }
}

/* Function to show and hide password */
function show() {
    if (passInputBox.type === "password") {
            passInputBox.type = "text";
    }
    else {
            passInputBox.type = "password";
    }
}

/* Function to change the hide and show icon */
let changeIcon = function(icon) {
    icon.classList.toggle('fa-eye')
}