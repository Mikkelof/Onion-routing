const cors = require('cors')
const express = require('express')
const NodeRSA = require('node-rsa')
const axios = require('axios')
const port = 3001
const app = express()
let dbSecretKey=""

app.use(express.json())

app.use(
    cors({
        origin: "*",
    })
)

app.listen(port, () => {
    console.log('Node is listening on port ' + port)
})

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const rsa = rsaKeys()
    dbSecretKey = rsa.privateKey
    res.status(201).json({
        package: rsa.publicKey
    })
    console.log(rsa.publicKey)
    console.log('Connection received at port ' + port)
})

resDecrypt = (text, key) => {
    let keyPrivate = new NodeRSA(key);
    keyPrivate.setOptions({ encryptionScheme: 'pkcs1_oaep' })
    let decrypt = keyPrivate.decrypt(text, 'utf8')
    return decrypt
}

rsaKeys = () => {
    const keys = new NodeRSA({b: 1024});
    keys.setOptions({ encryptionScheme: 'pkcs1_oaep' })
    const publicKey = keys.exportKey('public')
    const privateKey = keys.exportKey('private')
    return {
        publicKey: publicKey,
        privateKey: privateKey
    }
}

app.put('/send', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    let next = ''
    const body = req.body
    body.data = resDecrypt(body.data, dbSecretKey)
    if (body.nodeNum === 0) {
        next = resDecrypt(body.node2, dbSecretKey)
    } else if (body.nodeNum === 1) {
        body.node2 = 0
        next = resDecrypt(body.node3, dbSecretKey)
    } else if (body.nodeNum === 2) {
        body.node3 = 0
        next = resDecrypt(body.uri, dbSecretKey)
    }

    body.nodeNum = body.nodeNum + 1

    if (body.nodeNum === 3) {
        axios.put(`${next}/`, {data: body.data})
        .catch(err => {
          console.log(err)
        })
    } else {
        axios.put(`http://localhost:${next}/send`, {data: body.data, node2: body.node2, node3: body.node3, uri: body.uri, nodeNum: body.nodeNum})
        .catch(err => {
          console.log(err)
        })
    }
    res.end()
})