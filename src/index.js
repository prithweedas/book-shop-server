import express from "express"
import bodyParser from "body-parser"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello Books")
})

app.listen(PORT, err => {
  if (err) throw new Error(err)
  console.log(`Server started on ${PORT}`)
})
