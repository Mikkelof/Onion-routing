const cors = require('cors')
const express = require('express')
const NodeRSA = require('node-rsa');
const port = 6969
const app = express()

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    console.log('Connection received at port ' + port)
    console.log(req.body.data)
})

app.use(express.json())

app.use(
    cors({
        origin: "*",
    })
)

app.listen(port, () => {
    console.log('Destination is listening on port ' + port)
})
