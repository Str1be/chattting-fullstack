let time = 9;
const timertext = document.getElementById("refreshid");

document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    Send();
  }
});

function timer() {
  time--;
  if(time <= 0) {
    time = 9;
    messagesonscreen();
  }
  timertext.textContent = time;
}
setInterval(timer, 100);

function Send() {
    const message = document.getElementById('input').value;
    const author = document.getElementById('inputname').value;
    const data = { messagetext: message, author : author}
    fetch('/', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data),});
    document.getElementById('input').value = null;
    messagesonscreen();
}
let msgsprevious;
async function messagesonscreen() {
    let msgspreresult;
    const msgs = document.getElementById("messages");
    let messages = await fetch('/api/messages', {method: "POST",});
    messages = await messages.json();
    nmbofmessages = Object.keys(messages).length;
    //Рендер сообщений. Говно - переделать
    for (let i = 0; i < nmbofmessages; i++) {
      msgspreresult = msgspreresult + `${messages[i].author}:${messages[i].messagetext}` + "<br>";
    }
    if (msgs.innerHTML != msgsprevious) {
      msgs.innerHTML = msgspreresult;
    }
    msgsprevious = msgspreresult;
    
}
