const fs = require('fs')

exports.beforeMarked = async function (s) {
  let result
  result = s.replace(/^<<INC\[([^\]]*)\]/mg, (m, p1) => {
    let contents
    try {
      contents = fs.readFileSync(p1)
      return contents
    } catch (e) {
      console.error('Could not load included file:', p1)
      process.exit(100)
    }
  })

  result = result.replace(/^<<IMG\[([^\]]*)\]/mg, (m, p1) => {
    return `<img src="${p1}"></img>`
  })
  return result
}
