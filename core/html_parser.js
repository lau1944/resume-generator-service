const HTMLParser = require('node-html-parser')
const loader = require('./html_loader')

const load = async (id) => {
  const html = await loader.loadTemplateFromLocal(id)
  return html
}

const parse = async (id) => {
  const html = await load(id)
  const root = HTMLParser.parse(html)
  return root
}

const parseProjectView = () => {
  return HTMLParser.parse(`
    <div id="project">
      <h2>Projects</h2>
      <div class="title-divide"></div>

      <ul id="project-list"></ul>
    </div>
  `)
}

const parseProjectItem = ({ title, link, content }) => {
  return HTMLParser.parse(`
    <li id="project-item">
      <div class="header-layer">
        <div id="project-title">${title || ''}</div>
        <a
          id="project-link"
          href="${link || ''}"
          >Project link</a
        >
      </div>

      <div id="project-content">${content || ''}</div>
    </li>
  `)
}

const parseWorkView = () => {
  return HTMLParser.parse(`
  <div id="experience">
    <h2>Work Experience</h2>
    <div class="title-divide"></div>

    <ul id="work-list"></ul>

    <hr class="solid" />
  </div>
  `)
}

const parseWorkItem = ({ name, location, time, description }) => {
  return HTMLParser.parse(`
    <li>
      <div class="title">
        <div id="company-name">${name || ''}</div>
        <div>
          <div id="company-location">${location || ''}</div>
          <div id="company-time">${time || ''}</div>
        </div>
      </div>

      <div id="work">
        ${description || ''}
      </div>
    </li>
  `)
}

const parseEducationView = () => {
  return HTMLParser.parse(`
    <div id="education">
      <h2>Education</h2>
      <div class="title-divide"></div>

      <ul id="school-list" class="school">
      </ul>
    </div>
    <hr class="solid" />
  `)
}

const parseEduItem = (name, time, location) => {
  return HTMLParser.parse(`
    <li class="school-item">
      <div>
        <h3 id="university">${name || ''}</h3>
        <div id="school-time">${time || ''}</div>
      </div>
      <div>
        <div id="school-location">${location || ''}</div>
      </div>
    </li>
  `)
}

const parseProfileItem = (type, content) => {
  return HTMLParser.parse(`
  <li class="profile-item">
    <div>${type}</div>
    <div id="country" class="profile-txt">${content}</div>
  </li>`)
}

const parseLinkView = () => {
  return HTMLParser.parse(`
    <h2>LINKS</h2>
    <div class="title-divide"></div>
    <ul id="link-list"></ul>
  `)
}

const parseLinkItem = (type, link) => {
  return HTMLParser.parse(`
    <li class="profile-item">
      <a class="link-txt" href="${link}">${type}</a>
    </li>
  `)
}

const parseSkillView = () => {
  return HTMLParser.parse(`
    <h2>SKILLS</h2>
    <div class="title-divide"></div>
    <ul id="skill-list"></ul>
  `)
}

const parseSkillItem = (name, level) => {
  if (level < 1 || level > 5) {
    throw new Error('level should not smaller than 1 or larger than 5')
  }

  return HTMLParser.parse(`
      <li class="skill-item">
      <div id="skill-name">${name}</div>
      <div id="bar">
        <div class="bar-container">
          <div class="bar-${level}"></div>
        </div>
      </div>
    </li>
  `)
}

const parseLangView = () => {
  return HTMLParser.parse(`
    <h2>LANGUAGES</h2>
    <div class="title-divide"></div>
    <ul id="lang-list"></ul>
  `)
}

const parseLangItem = (name, level) => {
  if (level < 1 || level > 5) {
    throw new Error('level should not smaller than 1 or larger than 5')
  }

  return HTMLParser.parse(`
      <li class="lang-item">
      <div id="lang-name">${name}</div>
      <div id="bar">
        <div class="bar-container">
          <div class="bar-${level}"></div>
        </div>
      </div>
    </li>
  `)
}

module.exports = {
  parse,
  parseProfileItem,
  parseLinkView,
  parseLinkItem,
  parseSkillView,
  parseSkillItem,
  parseLangView,
  parseLangItem,
  parseEducationView,
  parseEduItem,
  parseWorkView,
  parseWorkItem,
  parseProjectView,
  parseProjectItem
}