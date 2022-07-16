import { createStore } from 'vuex'

export default createStore({
    modules: {

    },
    state: {
        firstName: 'John',
        lastName: 'Doe'
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        fullName: function (state) {
            return `${state.firstName} ${state.lastName}`;
        }
    }
})