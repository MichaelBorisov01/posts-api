import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        totalPages: 0,
        page: 1,
        limit: 10,
        dialog: false,
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
        setDialog(state, bool) {
            state.dialog = bool
        }
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
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },

        removePost({state, commit}, post) {
            commit('setPosts', state.posts.filter(p => p.id !== post.id))
        },
        createPost({state, commit}, post) {
            state.posts.push(post)

        },
        hideDialog({commit}) {
            commit('setDialog', false)
        },
    },

    namespaced: true
}