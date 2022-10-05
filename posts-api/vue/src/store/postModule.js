import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        totalPages: 0,
        page: 1,
        limit: 10,
    }),

    getters: {},
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
                return response.data
            } catch (e) {
                alert('Some mistake')
            } finally {
                commit('setLoading', false)
            }
        },
    },

    namespaced: true
}