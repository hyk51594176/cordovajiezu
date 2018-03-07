import themeObj from '../themeObj'

export default {
    state: {
        theme: getheme(),
        themeObj
    },
    mutations: {
        changeTheme(state, key) {
            state.theme = themeObj[key]
            localStorage.setItem('theme', key)
        }
    }
}





function getheme() {
    if (localStorage.getItem('theme')) {
        return themeObj[localStorage.getItem('theme')]
    } else {
        return themeObj.default
    }
}