import NodeRSA from 'node-rsa'
export default {
    methods: {
        rsaEncrypt(text, key) {
            let keyPublic = new NodeRSA(key)
            keyPublic.setOptions({ encryptionScheme: 'pkcs1_oaep' })
            const encrypted = keyPublic.encrypt(text, 'base64')
            return encrypted
        }
    }
}