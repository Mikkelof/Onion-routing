# Onion-routing

---

## Introduction

This project was a voluntary assignment in the course IDATT2104 - Network Programming. The assignment was to create an onion routing service as software or as a library written in a programming language of your choice. The full assignment text written in Norwegian can be found below.

My implementation has a server-side written in Node.js and a client-side written in Vue.js. It allows the user to send a HTTP-request with a specified message to a server of the clients choice. It uses RSA-encryption to encrypt the message. There are still quite a lot of work that needs to be done to reach the vision of this project, however this is a good start.

---

## How the current implementation works

My current implementation works in the following way: 

The user opens the website and inputs the uri of the server and the message he/she wants to send to the server

![Client website](/assets/images/clientSite.png)

When the client website is loaded, three random nodes will be chosen in a random order from the server-side and each of these nodes will generate a set of 1024-bit public and private RSA keys. The three private keys that are generated will be sent to the client. They are also printed to the console in the browser if the user wants to see them.

When the client has filled in both of the fields on the website, the request is ready to be made by clicking on the "Send request" button. When this button is clicked, the action starts. Firstly, the message will be wrapped in three layers of encryption, using each of the three public keys it got from the nodes.

When the message has been encrypted with all three keys, the address of the second node in the sequence will be encrypted using the key of the first node, the address of the third node will be encrypted using the key of the second node and the address of the destination server will be encrypted using the key from the third node.

After all this, the client will send a HTTP put-request to the first node, where the body of the request includes all the encrypted information. When the data arrives at the first node, the first layer of encryption will be "peeled off" the message. Then the address of the next node is also decrypted. Then it will send a new put-request to the newly decrypted address of the next node in the queue. 

This continues in node 2 and 3, as well as removing unencrypted the addresses of the previous nodes. When at node 3, the message will be fully unencrypted and it will be sent to the desired server. 

---

## Limitations and possible improvements

There are several possible improvements to my current solution. I was working alone and time ran away from me. 

Firstly, it only supports one-way communication by HTTP put-requests. Ideally it should support two-way communication and should not just be limited to one type of HTTP requests.

It is also hard-coded into a project that all the nodes are running on localhost, as only the port number changes between them. This is something that has to be changed in order to have a working real-life implementation of this.

And currently there is a hard-coded list of what nodes exist in server.js. This should also be changed, as now you need all the existing nodes to be running if you want to run the program, as any of them could be chosen. Here it would be ideal with a solution that can see what nodes are currently running and adapt to that.

Possibly implement AES encryption as well in order to send longer messages.

There is also no testing implemented in this project.

---

## Dependencies

#### Client

- [Axios: Used to make creating HTTP-requests easier](https://www.npmjs.com/package/axios)
- [Core-js: Standard library for JavaScript](https://www.npmjs.com/package/core-js)
- [Node-polyfill-webpack-plugin: Needed for webpack 5+](https://www.npmjs.com/package/node-polyfill-webpack-plugin)
- [Node-rsa: Library for creating and managing RSA keys](https://www.npmjs.com/package/node-rsa)
- [Vue: Needed for Vue.js](https://www.npmjs.com/package/vue)

#### Server

- [Axios: Used to make creating HTTP-requests easier](https://www.npmjs.com/package/axios)
- [Cors: Helped me avoid CORS-errors](https://www.npmjs.com/package/cors)
- [Express: Used to make setting up servers and handling HTTP-requests easier](https://www.npmjs.com/package/express)
- [Node-rsa: Library for creating and managing RSA keys](https://www.npmjs.com/package/node-rsa)

In order to learn how to use node-rsa I took inspiration from [this](https://www.youtube.com/watch?v=tWAWMIXVARw) example

---

## How to set up and run the project on your own machine

Firstly clone the project from the GitHub repo found [here](https://github.com/Mikkelof/Onion-routing)

#### Client

Navigate to the ../Onion-routing/client folder in a terminal window. Once here type

```
npm install
```

in order to install all the required dependencies.

While still in the folder, run 

```
npm run serve
```

in order to launch the client website. It can then be found on **http://localhost:8080/**

#### Server

Navigate to the ../Onion-routing/Slient folder in a terminal window. Once here, type

```
npm install
```

in order to install all the required dependencies.

Here, as mentioned in the *Limitations and possible improvements* section, the project comes with five nodes. As we need to run all those, along with server.js and I would recommend running destination.js as well, as it is a server created in order to accept requests from the client and is a good way to verify that everything works.

So I would open the folder in 7 terminal windows. In the first five, run

```
node node*.js
```

where * is the number of the node (1, 2, 3, 4, 5). The nodes will be ran on port 300* where * is the same number as in the file name.

In the sixth terminal window, run

```
node server.js
```

This will launch server.js on port 3000

and in the seventh window, run

```
node destination.js
```

this will launch the destination server on port 6969.

#### When everything is running

You will now be able to make requests from the client, and see the message appear in the terminal running destination.js

---

## Full task description in Norwegian

Implementer onion routing enten som programvare eller programvarebibliotek i et valgfritt programmeringsspråk:
- Prioriter selv funksjonaliteter som skal inkluderes i løsningen.
  - Det forventes ikke en komplett løsning
- Implementasjon i mer utfordrende programmeringsspråk som C++ eller Rust gir positiv uttelling på karakteren.
- Bruk av ferdige onion routing programvare eller biblioteker er ikke tillatt, men andre aktuelle programvarebiblioteker er tillatt
- Lag en README.md fil for løsningen. Ta med:
    - Navn på løsningen og eventuell lenke til siste continuous integration/deployment kjøring
    - Introduksjon
    - Implementert funksjonalitet
    - Fremtidig arbeid med oversikt over nåværende mangler/svakheter
    - Eksterne avhengigheter med en kort beskrivelse av hver avhengighet og hva den er brukt til
    - Installasjonsinstruksjoner
    - Instruksjoner for å bruke løsningen
    - Hvordan en kan kjøre eventulle tester
    - Eventuell lenke til API dokumentasjon
    - Bruk av ekstern informasjon/kode skal dokumenteres.