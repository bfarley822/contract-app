import { createStore } from 'vuex'

export default createStore({
    modules: {

    },
    state: {
        user: {},
        isLoggedIn: false
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setLoggedIn (state) {
            state.isLoggedIn = true;
        }
    },
    actions: {

    },
    getters: {
        
    }
})