function Send() {
    let message = document.getElementById('input').value;
    console.log(`${message} - это сообщение`);
    fetch('/', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({message}),});
    document.getElementById('input').value = null;
}