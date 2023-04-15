//File defines all the functions included in the homepage

//Function call to create a new server 
function createNewServer(){
    var servername = document.getElementById("serverName").value;
    var username = localStorage.getItem("username");
    console.log(servername);
    console.log(username);
    const url = "http://localhost:8080/BisRopeServer-1.0-SNAPSHOT/api/bisrope-server/create-server/"+ servername +"/" + username;
    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                // If the response status is "ok", return the response text
                console.log(response.text);
                updateServerList();
            }
            // if (response.status === 401){
            //     console.log("Server name already exists. Please try again.");
            //     alert("Server name already exists. Please try again.");
            // }
            throw new Error('Network response was not ok.');
        })
}

//Function call to join an existing server
//Is used for someone who isn't part of the server but has the code
function addExistingServer(){
    var serverId = document.getElementById("serverId").value;
    var username = localStorage.getItem("username");
    const url = "http://localhost:8080/BisRopeServer-1.0-SNAPSHOT/api/bisrope-server/join-server/"+ serverId +"/" + username;
    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                // If the response status is "ok", return the response text
                console.log(response.text);
                alert("Server joined successfully");
            }
            if (response.status === 401){
                console.log("Server name does not exist. Please try again.");
                alert("Server name does not exist. Please try again.");
            }
            throw new Error('Network response was not ok.');
        })
}

//Function call to update the list of servers, defined in the list of servers in the HTML file
function updateServerList(){
    var username = localStorage.getItem("username");
    
    const url = "http://localhost:8080/BisRopeServer-1.0-SNAPSHOT/api/bisrope-server/get-server-list/" + username;
    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                // If the response status is "ok", return the response text
                console.log(response.text);
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const table = document.getElementById("serverListTable");
            serverArray = data.slice(1, -1).split(", ");
            console.log(serverArray);
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            for (let i = 0; i < serverArray.length; i++) {
                // Create a new row in the chat room list table
                const row = table.insertRow();
                // Create a new cell in the row and add a link to the chat room
                const cell = row.insertCell();
                const linkText = document.createTextNode(serverArray[i]);
                const link = document.createElement("a");
                link.appendChild(linkText);
                link.href = "#"; // Set href to # so that the link doesn't redirect the page
                // When the link is clicked, call the enterRoom() function for the selected chat room
                link.onclick = function() {
                    joinSelectedServer(serverArray[i]);
                    return false; // Prevent the link from redirecting the page
                }
                cell.appendChild(link);
            }
        })
}

//Function call to change page to the server listed
function joinSelectedServer(serverName){
    var serverListElement = document.getElementById("serverList");
    var serverElement = document.createElement("li");
    serverElement.innerHTML = serverName;
    serverListElement.appendChild(serverElement);
}