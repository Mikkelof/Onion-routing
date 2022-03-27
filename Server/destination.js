const cors = require('cors')
const express = require('express')
const port = 6969
const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "*",
    })
)

app.listen(port, () => {
    console.log('Destination is listening on port ' + port)
})

app.put('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    console.log('Connection received at port ' + port)
    const body = req.body
    console.log('Message received: ' + body.data)
})
