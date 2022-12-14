const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoutes =require("./routes/userRoutes")

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB 연결 성공'))
  .catch((err) => console.log('DB 연결 에러 ', err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/`)
})
