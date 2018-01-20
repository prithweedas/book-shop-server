import express from "express"
import bodyParser from "body-parser"

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/", (req, res) => {
  res.json(req.body)
})

app.listen(PORT, err => {
  if (err) throw new Error(err)
  console.log(`Server started on ${PORT}`)
})
