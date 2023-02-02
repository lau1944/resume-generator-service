/* eslint-disable space-before-function-paren */
const { parse, parseProfileItem, parseLinkView, parseLinkItem, parseSkillView, parseSkillItem, parseLangView, parseLangItem, parseEducationView, parseEduItem, parseWorkView, parseWorkItem, parseProjectView, parseProjectItem } = require('../core/html_parser')

const CLASSIC_RESUME_ID = 'classic'

const bindMap = {
  [CLASSIC_RESUME_ID]: bind
}

const handleAll = async (data, callback) => {
  const details = data.request
  const resumeId = details.resumeId

  try {
    const bindFunc = bindMap[resumeId]

    if (!bindFunc) {
      callback(new Error('Cannot find this resume id'), { code: 2, status: 'failed', body: null })
      return
    }

    const root = await parse(resumeId)
    callback(null, { code: 1, status: 'success', body: bindFunc(root, details) })
  } catch (e) {
    callback(e, { code: 2, status: 'failed', body: null })
  }
}

/**
 *
 * @param {Node} Html root node
 * @param {Resume} resume detail
 * @returns
 */
function bind(root, data) {
  // bind data into profile view
  bindProfile(data.profile, root)

  // bind link into profie
  bindLinks(data.links, root)

  // bind skills into skill view
  bindSkills(data.skills, root)

  // bind lang name into lang view
  bindLangs(data.langs, root)

  // bind intro
  bindIntro(root, data.introduction)

  // bind education
  bindEducation(root, data.educations)

  // bind work
  bindWork(root, data.works)

  // bind project
  bindProject(root, data.projects)

  return root.toString()
}

function bindProject(root, projects) {
  if (!projects || projects.length === 0) {
    return
  }

  const eduView = root.querySelector('#des-list')
  eduView.appendChild(parseProjectView())

  const eduList = root.querySelector('#project-list')
  for (const project of projects) {
    eduList.appendChild(parseProjectItem(project))
  }
}

// bind work into view
function bindWork(root, works) {
  if (!works || works.length === 0) {
    return
  }

  const eduView = root.querySelector('#des-list')
  eduView.appendChild(parseWorkView())

  const eduList = root.querySelector('#work-list')
  for (const work of works) {
    eduList.appendChild(parseWorkItem(work))
  }
}

// bind education to view
function bindEducation(root, edus) {
  if (!edus || edus.length === 0) {
    return
  }
  const eduView = root.querySelector('#des-list')
  eduView.appendChild(parseEducationView())

  const eduList = root.querySelector('#school-list')
  for (const edu of edus) {
    eduList.appendChild(parseEduItem({ name: edu.name, startTime: edu.startTime, endTime: edu.endTime, location: edu.location, content: edu.content, degree: edu.degree }))
  }
}

// bind intro to view
function bindIntro(root, intro) {
  const element = root.querySelector('#introduction')
  element.set_content(intro)
}

// bind user profile details to html
function bindProfile(profile, root) {
  const {
    firstName,
    lastName,
    role,
    avatar,
    email,
    country,
    phoneNumber,
    city
  } = profile
  root.querySelector('#first-name').set_content(firstName)
  root.querySelector('#last-name').set_content(lastName)
  root.querySelector('#role').set_content(role)
  if (avatar) {
    root.querySelector('#avatar').setAttribute('src', avatar)
  }
  const details = root.querySelector('#profile-list')
  if (email) {
    details.appendChild(parseProfileItem('EMAIL', email))
  }

  if (country) {
    details.appendChild(parseProfileItem('COUNTRY', country))
  }

  if (city) {
    details.appendChild(parseProfileItem('CITY', city))
  }

  if (phoneNumber) {
    details.appendChild(parseProfileItem('PHONE NUMBER', phoneNumber))
  }
}

function bindLinks(links, root) {
  if (!links || links.length === 0) {
    return
  }

  const linkElement = root.querySelector('#links')
  linkElement.appendChild(parseLinkView())

  const linkList = root.querySelector('#link-list')
  for (const e of links) {
    const { type, link } = e
    linkList.appendChild(parseLinkItem(type, link))
  }
}

function bindSkills(skills, root) {
  if (!skills || skills.length === 0) {
    return
  }

  const skillElement = root.querySelector('#skills')
  skillElement.appendChild(parseSkillView())

  const skillList = root.querySelector('#skill-list')
  for (const e of skills) {
    const { name, level } = e
    skillList.appendChild(parseSkillItem(name, level))
  }
}

function bindLangs(langs, root) {
  if (!langs || langs.length === 0) {
    return
  }

  const skillElement = root.querySelector('#language')
  skillElement.appendChild(parseLangView())

  const skillList = root.querySelector('#lang-list')
  for (const e of langs) {
    const { name, level } = e
    skillList.appendChild(parseLangItem(name, level))
  }
}

module.exports = handleAll
