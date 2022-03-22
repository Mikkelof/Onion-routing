import NodeRSA from 'node-rsa'
export default {
    methods: {
        rsaEncrypt(text, key) {
            let keyPublic = new NodeRSA(key);
            const encrypted = keyPublic.encrypt(text, 'base64')
            return encrypted
        }
    }
}