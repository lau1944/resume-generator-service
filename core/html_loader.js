const fs = require('fs')
const path = require('path')

async function loadTemplateFromLocal (id) {
  const file = await fs.promises.readFile(path.join(__dirname, '..', 'templates', `${id}.html`))
  return file.toString('utf-8')
}

module.exports = {
  loadTemplateFromLocal
}
