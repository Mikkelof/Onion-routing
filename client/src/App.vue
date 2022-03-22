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
      <h3>Enter URL of server you want to connect to (for example http://localhost:3000)</h3>
      <input type="text" id="url" name="url" v-model="url"><br><br>
      <input type="submit" values="Send" value="Send request" @click="sendRequest(url)">
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
      publicKey: '',
      url: '',
      hash: '',
    }
  },
  methods: {
    sendRequest(url) {
      axios.get(url)
        .then(result => {
          const body = result.data
          this.publicKey = body.package
          console.log(body.package)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
