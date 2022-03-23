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
      this.message = message
      const encMessage = this.rsaEncrypt(message, this.publicKey)
      this.hash = encMessage

      console.log(this.message)
      console.log(this.hash)

      axios.put(uri, {data: encMessage})
        .then(result => {
          console.log(result)
        })
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
          console.log(this.nodes.length)
      })

      this.nodes.forEach(node => {
        axios.get(`http://localhost:${node}`)
          .then(result => {
            const body = result.data
            this.publicKeys.push(body.package)
            console.log(body.package)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

    getRes()

    console.log(this.nodes.length)
  }
}
</script>
