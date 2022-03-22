const NodeRSA = require('node-rsa')

const key = new NodeRSA({b: 1024})

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

export { encrypt, decrypt }