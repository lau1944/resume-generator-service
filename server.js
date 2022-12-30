const grpc = require('@grpc/grpc-js')
require('dotenv').config()

const server = new grpc.Server()

function listen (port, callback) {
  server.bindAsync(
    `localhost:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (_error, port) => {
      callback(_error, port)
      server.start()
    }
  )
  return server
}

module.exports = {
  listen
}
