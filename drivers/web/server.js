const express = require('express')
const app = express()
const cors = require('cors')

app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.options('*', cors())

app.get('/', (req, res) =>
  res.status(200).json({
    success: true,
    message: '환영합니다! 안녕하십니까?'
  })
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
