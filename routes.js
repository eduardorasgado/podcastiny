// from: https://github.com/fridays/next-routes
// instalamos npm add next-routes
const routes = require('next-routes')

// Name   Page      Pattern
module.exports = routes()                           
.add('index')
// por convencion un punto intermedio
.add('channel', '/:slug.:id','channel')
// por cada uno de los elementos dentro de la url
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')

// .add('/:noname/:lang(en|es)/:wow+', 'complex')
// .add({name: 'beta', pattern: '/v3', page: 'v3'})