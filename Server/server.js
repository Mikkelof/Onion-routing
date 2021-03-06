const cors = require('cors')
const express = require('express')
const port = 3000
const app = express()

const nodes = [3001, 3002, 3003, 3004, 3005]

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const randOrder = nodes.sort(() => 0.5 - Math.random())
    let threeNodes = randOrder.slice(0, 3)
    console.log('Selected three nodes for the client')
    res.status(201).send(threeNodes)
})

app.use(express.json())

app.use(
    cors({
        origin: "*",
    })
)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})