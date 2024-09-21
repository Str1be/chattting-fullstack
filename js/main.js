const express = require('express')
const app = express()
const port = 8080

app.use(express.static("public"))
app.use(express.json())


app.post('/', (req,res) => {
  console.log(req.body);
  return res.status(200).send();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. http://localhost:${port}`)
})