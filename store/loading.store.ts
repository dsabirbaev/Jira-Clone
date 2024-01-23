
import { defineStore } from 'pinia';


export const useLoading = defineStore('loading', {
    state: () => ({
        isLoading : true
    }),
    actions: {
        set(isLoading: Boolean) {
            this.$patch({ isLoading })
        }
    }
})