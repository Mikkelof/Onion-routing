const cors = require('cors')
const express = require('express')
const NodeRSA = require('node-rsa');
const port = 3000
const app = express()

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const rsa = rsaKeys()
    dbSecretKey = rsa.privateKey
    res.status(201).json({
        package: rsa.publicKey
    })
    console.log('Connection received')
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

let dbSecretKey=""

resDecrypt = (text, key) => {
    let keyPrivate = new NodeRSA(key);
    let decrypt = keyPrivate.decrypt(text, 'utf8');
    return decrypt
}

rsaKeys = () => {
    const keys = new NodeRSA({b: 1024});
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    return {
        publicKey: publicKey,
        privateKey: privateKey
    }
}

app.put('/send', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const body = req.body;
    console.log(body.data);
    console.log(resDecrypt(body.data, dbSecretKey));
})