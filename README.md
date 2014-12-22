# messenger

NodeJS, SocketIO, PHP setup to send real-time notifications between a PHP and NodeJS installation. 

## Using:

**Client side:**

* RequireJS
* UnderscoreJS
* SocketIO client

**Server side:**

* php (serving the client)
* nodejs (serving the backend that emits the notifications)
* cli-color (for nice colouring in our nodejs cli logs)
* mysql (for retrieving notifications)
* Socket.IO server (for communication to client)
* UnderscoreJS

## Getting started

**Installation:**

In project root, run:

```bash
npm install
```

In `/public` folder, run:

```bash
bower install
```

**Turning it all on:**

On project root, run:

```bash
node index.js
```

In `/public` folder, run:

```bash
php -S localhost:8000
```
