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

app.post('/api/log', async (req,res) => {
  const nickname = req.body.nickname;
  const password = req.body.password;
  let dbanswer = await db.query(`SELECT username FROM users WHERE username='${nickname}'`);
  dbanswer = JSON.stringify(dbanswer);
  if (dbanswer == "[]") {
    res.status(200).send({"status":"NoAcc"});
  }
  else {
    const dbispass = await db.query(`SELECT password FROM users WHERE username='${nickname}'`);
    if(dbispass[0].password == password) {
      res.status(200).send({"status":"LoginSuccess"});
    }
    else {
      res.status(200).send({"status":"WrongPass"});
    }
  }
})

app.post('/api/reg', async (req,res) => {
  const nickname = req.body.nickname;
  const password = req.body.password;
  let dbanswer = await db.query(`SELECT username FROM users WHERE username='${nickname}'`);
  dbanswer = JSON.stringify(dbanswer);
  console.log(dbanswer);
  if (dbanswer == "[]") {
    await db.query(`INSERT INTO users (username, password) VALUES ('${nickname}', '${password}')`)
    res.status(200).send({"status":"AccCreated"});
  }
  else {
    res.status(200).send({"status":"AccExist"});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. http://localhost:${port}`)
})