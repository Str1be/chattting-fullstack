function Send() {
    let message = document.getElementById('input').value;
    fetch('/', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({message}),});
    document.getElementById('input').value = null;
    messagesonscreen();
}
function messagesonscreen(){
    let messages = fetch('/api/messages', {method: "POST",});
    console.log(messages);
}