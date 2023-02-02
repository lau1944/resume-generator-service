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

module.exports = {
  parse
}
