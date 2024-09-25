document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    Send();
  }
});
window.onload = () => messagesonscreen("page loaded!");
setInterval(() => messagesonscreen("refresh"), 1000);

function Send() {
    const message = document.getElementById('input').value;
    const author = document.getElementById('inputname').value;
    const data = { messagetext: message, author: author}
    fetch('/', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data),});
    document.getElementById('input').value = null;
    messagesonscreen("send");
}
let msgsprevious;
async function messagesonscreen(from) {
    console.log(from);
    let msgspreresult;
    const msgs = document.getElementById("messages");
    let messages = await fetch('/api/messages', {method: "POST",});
    messages = await messages.json();
    nmbofmessages = Object.keys(messages).length;
    //Рендер сообщений. Говно - переделать
    for (let i = 0; i < nmbofmessages; i++) {
      msgspreresult = msgspreresult + `<div class="message_box"><div class="author">${messages[i].author}</div><div class="message_text">${messages[i].messagetext}</div></div>`;
    }
    if (msgs.innerHTML != msgsprevious) {
      msgs.innerHTML = msgspreresult;
    }
    msgsprevious = msgspreresult;
    
}
