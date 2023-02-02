const classicBind = require('../core/binder_1')
const { parse } = require('../core/html_parser')

const CLASSIC_RESUME_ID = 'classic'

const bindMap = {
  [CLASSIC_RESUME_ID]: classicBind
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

module.exports = handleAll
