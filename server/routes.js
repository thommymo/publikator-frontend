const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes
  .add('index', '/')
  .add('github', '/github/:login?/:repository?/:view?/:path*')

  .add('editor/list', '/stories/')
  .add('editor/edit', '/stories/edit/:repository/:commit?')
  .add('editor/meta', '/stories/meta/:repository')
  .add('editor/tree', '/stories/tree/:repository')
  .add('editor/publish', '/stories/publish/:repository/:commit?')

module.exports = routes
