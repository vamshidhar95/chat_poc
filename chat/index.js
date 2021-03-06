// 'use strict';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

const chatHeadUrl = (isLocalhost) ? "/chat/chatHead.html" : "/chat_poc/chat/chatHead.html"

console.log("Chat Application");
var ajax = new XMLHttpRequest();
ajax.open("GET", chatHeadUrl, false);
ajax.send();
document.body.innerHTML += ajax.responseText;


// Get Domain name 
const pageUrl = window.location.href.split("/");
const domain = pageUrl[2];


// Setting the expiry of Cookie
let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();  


// Get the Input element
let textInput = document.getElementById("input-text");
var wage = document.getElementById("wage");
textInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        onSendMessage(e.target.value);
    }else{
        onInputTextChange(e.target.value);
    }
});




// *** Chat Head script ***


// let userChatData = [
//     {
//         name: "User A",
//         message: "Hi there"
//     },
//     {
//         name: "User B",
//         message: "Hi. How are you doing?"
//     },
//     {
//         name: "User A",
//         message: "Good! How are you?"
//     },
//     {
//         name: "User B",
//         message: "Great!"
//     },
//     {
//         name: "User A",
//         message: "How may I help you"
//     },
//     {
//         name: "User B",
//         message: "Need Credit card"
//     },
//     {
//         name: "User A",
//         message: "Apply Online or by mobile app"
//     },
//     {
//         name: "User B",
//         message: "Tried doing that, Did not work"
//     },
//     {
//         name: "User A",
//         message: "Let me check for what went wrong"
//     },
//     {
//         name: "User B",
//         message: "Sure"
//     }
// ];


// Print the chat in chat-view container
function printChat(userChatData){
    
    let chatView = document.getElementById("messages");
    let htmlData = "";

    // for(let index=0; index<userChatData.length; index++){
    //     const className = (index%2 == 0) ? "my-chat" : "client-chat";
    //     htmlData += "<p class="+className+">"+userChatData[index].message +"</p>";
    // }

    let index = userChatData.length-1;

    while(index >= 0){
        const className = (index%2 == 0) ? "my-chat" : "client-chat";
        htmlData += "<p class="+className+">"+userChatData[index].message +"</p>";
        index--;
    }

    chatView.innerHTML = htmlData;
    
}

const userChatData = fetchLocalData();
if(userChatData != null){
    printChat(userChatData);
}


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

        if(userMessage != ""){
            textInput.value = userMessage;
            document.getElementById("chat-div").style.display = "block";
        }
            
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

function fetchLocalData(){
    let userChatData = localStorage.getItem('user_input');
    if(userChatData){
        userChatData = JSON.parse(userChatData);
    }
    return userChatData;
}

function onSendMessage(value){
    const userInput = {
        name: "User A",
        message: value
    };
    let array = fetchLocalData();
    // let array = [];
    if(array != null){
        array.push(userInput);
    }else{
        array = new Array();
        array.push(userInput);
    }
    localStorage.setItem("user_input", JSON.stringify(array));
    textInput.value = "";
    document.cookie = "user_input=";
    printChat(array);
    
}


// Clear the value of input and cookie
function clearInput(){

    textInput.value = "";
    document.cookie = 'user_input=; path=/';

}

function openchat(){
    document.getElementById("chat-div").style.display = "block";
}

function closechat(){
    document.getElementById("chat-div").style.display = "none";
}


// *** //
