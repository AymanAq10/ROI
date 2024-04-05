const functions = require('firebase-functions')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/data/db.json')
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);

server.listen(3000,()=>{
    console.log('json-server is running');
})

exports.api = functions.https.onRequest(server)