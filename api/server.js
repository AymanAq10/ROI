const jsonServer = require('json-server');
const cors = require("cors");
const server = jsonServer.create();

const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // Add parentheses after cors
server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

server.listen(3002, () => {
    console.log('JSON Server is running');
});

module.exports = server;
