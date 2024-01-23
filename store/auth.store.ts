import { defineStore } from 'pinia';


interface User {
    email: "",
    naem: "",
    id: "",
    status: false,
}

const initialState: { user: User} = {
    user: {
        email: "",
        naem: "",
        id: "",
        status: false,
    }
}

export const useAuthStore = defineStore('alerts', {
    state: () => initialState,

    getters: {
        currentUser: state => state.user,
    },

    actions: {
        set(user: User) {
            this.$patch({ user })
        },

        clear() {
            this.$patch( initialState )
        },
    }
})


