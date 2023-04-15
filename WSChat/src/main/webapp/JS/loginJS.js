//File defines the function calls to backend when user enters username and password, or creates a new pair




//Function to call backend with a restful fetch to create a new user
function createUser() {
    var username = document.getElementById("createusername").value;
    var password = document.getElementById("createpassword").value;
    const url = "http://localhost:8080/BisRopeServer-1.0-SNAPSHOT/api/bisrope-server/create-account/"+ username +"/" + password;
    

    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                // If the response status is "ok", return the response text
                console.log(response.text);
                alert("Account created successfully");
            }
            if (response.status === 401){
                console.log("Username already exists. Please try again.");
                alert("Username already exists. Please try again.");


            }
            throw new Error('Network response was not ok.');
        })
        //Creates a message in HTML that indicates that the account has already been created
}



function logIn(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const url = "http://localhost:8080/BisRopeServer-1.0-SNAPSHOT/api/bisrope-server/login/"+ username +"/" + password;
    

    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                // If the response status is "ok", return the response text
                console.log(response.text);
                alert("Login successful");
                window.location.href = "http://localhost:8080/WSChat/chat.html";
            }
            if (response.status === 401){
                console.log("Username or password is incorrect. Please try again.");
                alert("Username or password is incorrect. Please try again.");

            }
            throw new Error('Network response was not ok.');
        })

    //pass the username variable to the homepageJS file
    localStorage.setItem("username", username);
    console.log(localStorage.getItem("username"));

        
}