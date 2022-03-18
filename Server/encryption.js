const NodeRSA = require('node-rsa')

const key = new NodeRSA({b: 512})

function encrypt(message) {
    const encryptedMessage = key.encrypt(message, 'base64')
    
    console.log('encrypted: ' + encryptedMessage)

    return encryptedMessage
}

function decrypt(messageEncrypted) {
    const decryptedMessage = key.decrypt(messageEncrypted, 'utf8')

    console.log('decrypted: ' + decryptedMessage)

    return decryptedMessage
}

const encrypted = encrypt("boi")
decrypt(encrypted)