var connect = require("connect");
var serveStatic = require("serve-static");
var path = require("path");

console.log("serving");

connect()
  .use(serveStatic(path.join(__dirname, "/dest")))
  .listen(process.env.PORT || 8080);
