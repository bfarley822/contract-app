import { createStore } from 'vuex'

export default createStore({
    modules: {

    },
    state: {
        user: {},
        isLoggedIn: false,
        currTab: "home"
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setLoggedIn (state) {
            state.isLoggedIn = true;
        },
        setCurrTab (state, tab) {
            state.currTab = tab;
        }
    },
    actions: {

    },
    getters: {
        
    }
})