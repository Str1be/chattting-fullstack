const express = require('express');
const { db } = require('./sqlconnection');
const app = express()
const port = 8080;

app.use(express.static("public"))
app.use(express.json())

app.post('/', (req,res) => {
  let MessageFromChat = (req.body.message);
  if (MessageFromChat != null) {
    try{
      db.query(`INSERT INTO messages(messagetext) VALUES ('${MessageFromChat}');`);
  }
    catch(err){
        console.log(err);
    }
    return res.status(200).send();
  }
  else {
    return res.status(400).send();
  }
})

app.post('/api/messages', (req,res) => {
  let MessagesFromDB;
  MessagesFromDB.then(db.query(`SELECT * FROM messages`))
  console.log(MessagesFromDB);
  res.status(200).send(MessagesFromDB);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. http://localhost:${port}`)
})