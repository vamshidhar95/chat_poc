'use strict';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  const url = (isLocalhost) ? "/chat/chatHead.html" : "/chat_poc/chat/chatHead.html"

console.log("Chat Application");
var ajax = new XMLHttpRequest();
ajax.open("GET", url, false);
ajax.send();
document.body.innerHTML += ajax.responseText;


// Get Domain name 
const url = window.location.href.split("/");
const domain = url[2];


// Setting the expiry of Cookie
let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();  


// Get the Input element
let textInput = document.getElementById("input-text");




// *** Chat Head script ***


let userChatData = [
    {
        name: "User A",
        message: "Hi there"
    },
    {
        name: "User B",
        message: "Hi. How are you doing?"
    },
    {
        name: "User A",
        message: "Good! How are you?"
    },
    {
        name: "User B",
        message: "Great!"
    },
    {
        name: "User A",
        message: "How may I help you"
    },
    {
        name: "User B",
        message: "Need Credit card"
    },
    {
        name: "User A",
        message: "Apply Online or by mobile app"
    },
    {
        name: "User B",
        message: "Tried doing that, Did not work"
    },
    {
        name: "User A",
        message: "Let me check for what went wrong"
    },
    {
        name: "User B",
        message: "Sure"
    }
];


// Print the chat in chat-view container
function printChat(){
    
    let chatView = document.getElementById("messages");
    let htmlData = "";

    for(let obj of userChatData){
        htmlData += "<p><b>"+obj.name+" </b>"+ obj.message +"</p>";
    }

    chatView.innerHTML = htmlData;
    
}
printChat();


// Check for the cookies
checkForCookies();
function checkForCookies() {
    
    let cookies = document.cookie;
    console.log(cookies);

    if(cookies){
        
        let cookiesList = cookies.split(";");
        let userMessage = "";
        
        cookiesList.forEach(element => {
           
            if(element.includes("user_input")){
               let data = element.split('=');
               userMessage = data[1];
           
            }

        });

        if(userMessage != "")
            textInput.value = userMessage;
    }
    
}


// Set the cookies after every input value change
function onInputTextChange(value){

    console.log(value);

    // store in cookie
    document.cookie = 'user_input=' + value + 
                    // '; domain=' + domain + 
                    '; path=/; expires= ' + date;

                }


// Clear the value of input and cookie
function clearInput(){

    textInput.value = "";
    document.cookie = 'user_input=; path=/';

}


// *** //