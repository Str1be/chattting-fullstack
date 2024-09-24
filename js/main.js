const express = require('express');
const { db } = require('./sqlconnection');
const app = express()
const port = 8080;

app.use(express.static("public"))
app.use(express.json())

app.post('/', (req,res) => {
  const MessageFromChat = (req.body.messagetext);
  const author = (req.body.author);
  if (MessageFromChat != "") {
    console.log(MessageFromChat + " | " + author)
    db.query(`INSERT INTO messages(messagetext, author) VALUES ('${MessageFromChat}', '${author}');`);
    return res.status(200).send();
  }
  else{
    return res.status(400).send();
  }
})

app.post('/api/messages', async (req,res) => {
  let MessagesFromDB = await db.query(`SELECT * FROM messages;`);
  res.status(200).send(MessagesFromDB);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. http://localhost:${port}`)
})