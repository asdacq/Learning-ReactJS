export function validateForm(id, password){
    const errorArray = [];
    var emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(!emailRegularExpression.test(String(id).toLowerCase())){
        errorArray.push("Invalid email");
    }
    if(!passwordRegularExpression.test(String(password)) || password.length < 8 || !checkLowerCase(password) || !checkUpperCase(password) ){
        errorArray.push("Password must contain at least 8 characters and a combination of lowercase, uppercase, number and a special character");
    }
    return errorArray;
}

/* 
** Helper Functions
*/

// Check if string has at least 1 lowercase
var checkLowerCase = (password) => {
    return password.toUpperCase() != password;
}
// Check if string has at least 1 lowercase
var checkUpperCase = (password) => {
    return password.toLowerCase() != password;
}


