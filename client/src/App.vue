<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Onion routing</title>
  </head>
  <body>
      <h3>Enter uri of server you want to connect to (for example http://localhost:6969)</h3>
      <input type="text" id="uri" name="uri" v-model="uri"><br><br>
      <h3>Enter the message you want to send to the destination</h3>
      <input type="text" id="message" name="message" v-model="message"><br><br>
      <input type="submit" values="Send" value="Send request" @click="sendRequest(uri, message)">
  </body>
  </html>
</template>

<script>
import axios from 'axios'
import RSA from '@/mixins/rsa'
export default {
  name: 'App',
  mixins: [RSA],
  data() {
    return {
      publicKeys: [],
      nodes: [],
      uri: 'http://localhost:6969',
      message: '',
      hash: '',
    }
  },
  methods: {
    sendRequest(uri, message) {
      let encMessage = message
      let node1 = this.nodes[2]
      let node2 = this.nodes[1]
      let node3 = this.nodes[0]

      for (let i = 0; i < 3; i++) {
        encMessage = this.rsaEncrypt(encMessage, this.publicKeys[i])
      }

      node2 = this.rsaEncrypt(node2, this.publicKeys[2])
      node3 = this.rsaEncrypt(node3, this.publicKeys[1])
      uri = this.rsaEncrypt(uri, this.publicKeys[0])

      axios.put(`http://localhost:${node1}/send`, {data: encMessage, node2: node2, node3: node3, uri: uri, nodeNum: 0})
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    const getRes = async () => {
      const response = await axios.get('http://localhost:3000/')
      response.data.forEach(node => {
          console.log(node)
          this.nodes.push(node)
      })

      for (let index = 0; index < this.nodes.length; index++) {
        const node = this.nodes[index]
        const response = await axios.get(`http://localhost:${node}`)
        const body = response.data
        this.publicKeys.push(body.package)
        console.log(body.package)
      }
    }

    getRes()
  }
}
</script>
