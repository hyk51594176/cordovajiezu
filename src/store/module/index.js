// const files = require.context('.', false, /\.js$/)
// const modules = {}
// files.keys().forEach((key) => {
//     if (key === './index.js') return
//     modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
// })
let modules = {}
export default (files => {
    files.keys.forEach(key => {
        if (key === 'index') return
        modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
    })
})(require.context('./', false, /\.js$/))