const cors = require('cors')
const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => {
    console.log('Connection received')
})

app.use(
    cors({
        origin: "*",
    })
)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})