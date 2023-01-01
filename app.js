const server = require('./server')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const path = require('path')
const resumeHandler = require('./handler/resume_handler')

const PORT = process.env.PORT || 5001

const PROTO_PATH = './proto'

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const app = server.listen(PORT, (err, port) => {
  if (err) {
    console.log(err)
    throw err
  }

  console.log(`RPC server is listening on port ${port}`)
})

const packageDefinition = protoLoader.loadSync(path.join(PROTO_PATH, 'resume.proto'), options)
const resumeProto = grpc.loadPackageDefinition(packageDefinition)

app.addService(resumeProto.ResumeService.service, {
  bindAll: resumeHandler
})
