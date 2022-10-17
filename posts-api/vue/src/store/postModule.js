import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        totalPages: 0,
        page: 1,
        limit: 10,
        dialog: false,
        selectedSort: '',
        selectedSortId: Number,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
            {value: 'id', name: 'По ID'},
        ]
    }),

    getters: {
        sortedPosts(state) {
            if (state.selectedSort === 'id') {
                return [...state.posts].sort((post1, post2) =>
                    post1[state.selectedSortId]?.localeCompare(post2[state.selectedSortId])
                )
            } else {
                return [...state.posts].sort((post1, post2) =>
                    post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
                )
            }
        },
    },
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
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
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