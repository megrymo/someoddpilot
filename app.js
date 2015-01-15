var connect = require("connect");
var serveStatic = require("serve-static");
var path = require("path");
var compression = require("compression");

console.log("serving");

connect()
  .use(serveStatic(path.join(__dirname, "/dest")), {
    maxAge: 1000 * 60 * 60 * 24
  })
  .use(compression())
  .listen(process.env.PORT || 8080);
