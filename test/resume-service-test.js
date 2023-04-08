const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const Server = require('../server')
const handler = require('../handler/resume_handler')
const { expect } = require('chai')
const fs = require('fs')

const PORT = process.env.PORT || 5001

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

describe('RPC setup', () => {
  let server

  it('Server start', () => {
    server = Server.listen(PORT, (err, port) => {
      if (err) {
        server.tryShutdown((e) => {
          console.log('Something went wrong')
          throw e
        })
      }
      console.log(`Server running at http://127.0.0.1:${port}`)
    })
  })

  const packageDefinition = protoLoader.loadSync(path.join(__dirname, '..', 'proto', 'resume.proto'), options)
  const resumeProto = grpc.loadPackageDefinition(packageDefinition)

  it('Add service to server', () => {
    server.addService(resumeProto.ResumeService.service, {
      bindAll: handler
    })
  })

  let client
  it('Client start', () => {
    client = new resumeProto.ResumeService(
      `localhost:${PORT}`,
      grpc.credentials.createInsecure()
    )
  })

  it('Trigger function', () => {
    const resume = {
      profile: {
        firstName: 'Ruiquan',
        lastName: 'Liu',
        role: 'Software engineer',
        email: 'lauchuen94@gmail.com',
        country: 'China',
        avatar: 'https://qlhawzpppotigunufwvu.supabase.co/storage/v1/object/public/avatars/resume/WechatIMG57.jpg'
      },
      links: [
        {
          type: 'Github',
          link: 'https://github.com/lau1944'
        },
        {
          type: 'Linkedin',
          link: 'https://www.linkedin.com/in/ruiquan-liu/'
        }
      ],
      skills: [
        {
          name: 'Java'
        },
        {
          name: 'Kotlin'
        },
        {
          name: 'Dart'
        },
        {
          name: 'Javascript'
        },
        {
          name: 'Mysql'
        },
        {
          name: 'MongoDB'
        },
        {
          name: 'Nodejs'
        },
        {
          name: 'Git'
        },
        {
          name: 'Unix'
        }
      ],
      langs: [
        {
          name: 'English'
        },
        {
          name: 'Chinese'
        }
      ],
      educations: [
        {
          name: 'Ming chuan university',
          startTime: '2016',
          endTime: '2020',
          location: 'Taipei',
          degree: 'Bachelor degree',
          major: 'Computer science'
        },
        {
          name: 'New York University',
          startTime: '2021 Sep 1',
          endTime: '2023 Jun 1',
          location: 'New York',
          degree: 'Master degree',
          major: 'Computer engineering'
        }
      ],
      works: [
        {
          name: 'DuoYi network',
          role: 'Software engineer',
          location: 'Guangzhou',
          startTime: '2020 May',
          endTime: '2021 Jun',
          description: '• Maintaining company internal work android app similar to slack, building new features with flutter and android. \n • Build common android modules and flutter library, like in-app update, authentication, in-app message, modules are tested and integrated by multiple, hight traffic application developed by company.'
        }
      ],
      projects: [
        {
          title: 'App hunt',
          link: 'https://play.google.com/store/apps/details?id=com.vau.apphunt.studiotech',
          content: 'A google play application explore tool with an iOS style UI interface. tech stack - android, firebase, nodejs, google cloud.\n. Develop native android app for users to search apps and games, users can post their recommendation.\n . Write REST API for accessing store data, post users content to database, push notifications.\n . Deploy service as docker container to Google Cloud cloud run platform. CircleCI to automate building process and deployment.',
          startTime: '2018 Jun',
          endTime: 'now'
        },
        {
          title: 'Season',
          link: 'https://seasonnatural.netlify.app/',
          content: 'Listen to white noise, nature sound. Mood tracker.\n . Develop Flutter application (cross platform), users can search collections of white noise, listen to the sound in background.\n . Writing REST API on Express, queries white noise data from mongodb. \n tech stack: flutter, nodejs, mongodb, redis.',
          startTime: '2020 Jun',
          endTime: 'now'
        },
        {
          title: 'Flow VPN',
          link: 'https://flow-china-vpn.vercel.app/',
          content: 'VPN app for connecting Chinese social network from abroad \n . Develop front end on Flutter (Mobile app) and React (Landing page), use OpenVpn client for connecting to remote VPN server.\n . Use Spring boot to interact with mysql server, redis, get user and server data from database, implement consistent hashing algorithm to handle load balance, design method to encrypt server info and send to client.\n . Manage OpenVpn server on Linux CentOS, hosted on Alibaba cloud, writing SHELL to automate process to manage vpn users.\n tech stack: flutter, springboot, nodejs, mongodb, mysql, rabbitmq, redis, openvpn.',
          startTime: '2021 Aug',
          endTime: 'now'
        },
        {
          title: 'Bunrest',
          link: 'https://github.com/lau1944/bunrest',
          content: 'An ExpressJs like API for bun http server, written in typescript, test covered. Hundred of star on github',
          startTime: '2021 Aug',
          endTime: '2021 Sep'
        },
        {
          title: 'AI chatbot',
          link: 'https://open-at-chat.netlify.app/',
          content: 'A chat tool that integrates with ChatGPT and includes multiple embedded functions such as paper and essay generation, code generation, etc. The backend uses the official ChatGPT API and communicates with the client through the WebSocket protocol. \n The frontend is developed using Flutter and uses the bloc library to handle business logic and state control. When a user enters the application, they are granted an independent token which is used as a credential to identify the user in both HTTP requests and web socket. \nThe backend is built using Node.js, MongoDB, and Redis. An API gateway is set up in the front, which is mainly responsible for authentication and load balancing. When a user requests a connection, this service assigns server nodes based on the token type (paid or free user) using the consistent hashing algorithm. The generated token is stored in Redis, and users who have obtained a token are considered "logged in" and can include the token in the header of their subsequent requests. \n The ChatGPT server is used to call the ChatGPT API and listen for user connections through WebSocket. The prompt of ChatGPT context is adjusted according to different request parameters. This service also includes a rate limit that is marked in Redis to limit the frequency of requests. The server is packaged as a microservice Docker container and deployed on Google Cloud Run.',
          startTime: '2023 Feb',
          endTime: 'now'
        }
      ],
      introduction: 'I am proficient in Java, Kotlin, Dart, understanding clean architecture and design pattern \n  I am skilled in writing high quality code and implementing real world software. \n I have many personal projects which fully developed by myself, published both on google play and app store, couple of them reach millions of downloads. \n I am a quick problem-solver, easy communicater and a quick learner.',
      resumeId: 'classic'
    }
    client.bindAll(resume, (err, res) => {
      if (err) {
        throw err
      }
      expect(1).equal(res.code)
      expect('success').equal(res.status)

      // write to html
      fs.writeFileSync('./test/result.html', res.body, (err) => {
        if (err) {
          throw err
        }
      })
    })
  })
})
