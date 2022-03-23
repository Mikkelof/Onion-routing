const cors = require('cors')
const express = require('express')
const axios = require('axios')
const port = 3000
const app = express()

const nodes = [3001, 3002, 3003, 3004, 3005]

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const randOrder = nodes.sort(() => 0.5 - Math.random())
    let threeNodes = randOrder.slice(0, 3)
    let publicKeys = []
    
    threeNodes.forEach(function(node) {
        axios.get(`http://localhost:${node}`)
        .then(result => {
            const body = result.data
            const publicKey = body.package
            publicKeys.push(publicKey)
            console.log(body.package)
        })
        .catch(err => {
            console.log(err)
        })
    })

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

app.put('/send', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const body = req.body
    console.log(body.data)
    console.log(resDecrypt(body.data, dbSecretKey))
})