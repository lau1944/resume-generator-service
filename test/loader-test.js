const { assert } = require('chai')
const loader = require('../core/html_loader')
const parser = require('../core/html_parser')

describe('Load file', () => {
  const id = 'classic'
  it('Load template from load', async () => {
    const html = await loader.loadTemplateFromLocal(id)
    assert(html !== null)
  })

  it('Parse html', async () => {
    const root = parser.parse(id)
    assert(root !== null)
  })
})
