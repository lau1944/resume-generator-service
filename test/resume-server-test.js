// const grpc = require('@grpc/grpc-js')
// const protoLoader = require('@grpc/proto-loader')
// const path = require('path')
// const { expect } = require('chai')
// const fs = require('fs')

// const PORT = 50012

// const options = {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true
// }

// const resume = {
//   profile: {
//     firstName: 'John',
//     lastName: 'Lennon',
//     role: 'Software engineer',
//     email: 'tt@gmail.com',
//     country: 'China',
//     avatar: 'https://miro.medium.com/max/720/1*v7eYkDuAVKSilUzhHQ4lLA.webp'
//   },
//   links: [
//     {
//       type: 'Github',
//       link: 'http://blank.com'
//     },
//     {
//       type: 'Linkedin',
//       link: 'http://blank.com'
//     },
//     {
//       type: 'Personal site',
//       link: 'http://blank.com'
//     }
//   ],
//   skills: [
//     {
//       name: 'Java',
//       level: 5
//     },
//     {
//       name: 'Kotlin',
//       level: 4
//     },
//     {
//       name: 'Golang',
//       level: 2
//     },
//     {
//       name: 'Javascript',
//       level: 5
//     }
//   ],
//   langs: [
//     {
//       name: 'Chinese',
//       level: 4
//     },
//     {
//       name: 'English',
//       level: 5
//     },
//     {
//       name: 'Spanish',
//       level: 2
//     }
//   ],
//   educations: [
//     {
//       name: 'Ming Chuan University',
//       time: '2020 Sep 9 - 2023 Jun 1',
//       location: 'Taipei'
//     },
//     {
//       name: 'New York University',
//       time: '2020 Sep 9 - 2023 Jun 1',
//       location: 'New York'
//     }
//   ],
//   works: [
//     {
//       name: 'Duo Yi network',
//       location: 'Guangzhou',
//       time: '2020 Sep - 2022 Jun',
//       description: 'Do some jobs'
//     }
//   ],
//   projects: [
//     {
//       title: 'App hunt',
//       link: 'https://blank.com',
//       content: 'sdsdaodqwojfaojfokpdsjkpfnsepkfnpkwenfpkwempfkneplfmnpfw'
//     },
//     {
//       title: 'Techcrunch',
//       link: 'https://blank.com',
//       content: 'sdsdaodqwojfaojfokpdsjkpfnsepkfnpkwenfpkwempfkneplfmnpfw'
//     }
//   ],
//   introduction: 'Enthusiastic software engineer, love implementing computersoftware.Always eager to learn new technologies, a fast learner.Always has passion to find out how things work under the hood.With the mobile development background, want to explore new areaon backend development, looking forward to new challenges.An opensource contributor, has experience on contributing open sourceproject.',
//   resumeId: 'classic'
// }

// describe('Client setup', () => {
//   const packageDefinition = protoLoader.loadSync(path.join(__dirname, '..', 'proto', 'resume.proto'), options)
//   const resumeProto = grpc.loadPackageDefinition(packageDefinition)

//   let client
//   it('Client start', () => {
//     client = new resumeProto.ResumeService(
//       `172.17.0.2:${PORT}`,
//       grpc.credentials.createInsecure()
//     )
//   })

//   it('Trigger function', () => {
//     client.bindAll(resume, (err, res) => {
//       if (err) {
//         throw err
//       }
//       expect(1).equal(res.code)
//       expect('success').equal(res.status)

//       // write to html
//       fs.writeFileSync('./test/result.html', res.body, (err) => {
//         if (err) {
//           throw err
//         }
//       })
//     })
//   })
// })
