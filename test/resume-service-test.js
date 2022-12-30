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
        firstName: 'John',
        lastName: 'Lennon',
        role: 'Software engineer',
        email: 'tt@gmail.com',
        country: 'China',
        avatar: 'https://miro.medium.com/max/720/1*v7eYkDuAVKSilUzhHQ4lLA.webp'
      },
      links: [
        {
          type: 'Github',
          link: 'http://blank.com'
        },
        {
          type: 'Linkedin',
          link: 'http://blank.com'
        },
        {
          type: 'Personal site',
          link: 'http://blank.com'
        }
      ],
      skills: [
        {
          name: 'Java',
          level: 5
        },
        {
          name: 'Kotlin',
          level: 4
        },
        {
          name: 'Golang',
          level: 2
        },
        {
          name: 'Javascript',
          level: 5
        }
      ],
      langs: [
        {
          name: 'Chinese',
          level: 4
        },
        {
          name: 'English',
          level: 5
        },
        {
          name: 'Spanish',
          level: 2
        }
      ],
      educations: [
        {
          name: 'Ming Chuan University',
          time: '2020 Sep 9 - 2023 Jun 1',
          location: 'Taipei'
        },
        {
          name: 'New York University',
          time: '2020 Sep 9 - 2023 Jun 1',
          location: 'New York'
        }
      ],
      works: [
        {
          name: 'Duo Yi network',
          location: 'Guangzhou',
          time: '2020 Sep - 2022 Jun',
          description: 'Do some jobs'
        }
      ],
      projects: [
        {
          title: 'App hunt',
          link: 'https://blank.com',
          content: 'sdsdaodqwojfaojfokpdsjkpfnsepkfnpkwenfpkwempfkneplfmnpfw'
        },
        {
          title: 'Techcrunch',
          link: 'https://blank.com',
          content: 'sdsdaodqwojfaojfokpdsjkpfnsepkfnpkwenfpkwempfkneplfmnpfw'
        }
      ],
      introduction: 'Enthusiastic software engineer, love implementing computersoftware.Always eager to learn new technologies, a fast learner.Always has passion to find out how things work under the hood.With the mobile development background, want to explore new areaon backend development, looking forward to new challenges.An opensource contributor, has experience on contributing open sourceproject.',
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
      // expect('hello world').equal(res.body)
    })
  })
})