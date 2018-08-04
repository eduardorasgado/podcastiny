// server.js
// para el uso de url dinamicas con next router:
// https://github.com/fridays/next-routes
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
// creamos una constante para alternar entre produccion y desarrollo
const port = process.env.PORT || 3000
// libreria http de node
// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(port)
})