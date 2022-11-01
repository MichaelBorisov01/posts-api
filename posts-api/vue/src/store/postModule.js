import axios from "axios";

export const postModule = {
    state: () => ({
        users: [],
        posts: [],
        isPostLoading: false,
        totalPages: 0,
        page: 1,
        limitUser: 9,
        limitPost: 10,
        selectedSort: '',
        selectedSortId: Number,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
            {value: 'id', name: 'По ID'},
        ],
        searchQuery: '',
        items: [
            {title: 'Посты', icon: '1', path: '/post'},
            {title: 'Пользователи', icon: `2`, path: '/user'}
        ],
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
        sortedAndSearchedPostsAndUsers(state, getters) {
            let postsAndUsers = []
            let users = [...state.users].filter(user => user.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
            let posts = getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
            postsAndUsers.push(posts, users)
            return postsAndUsers
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setUsers(state, users) {
            state.users = users
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
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
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitPost))
                commit('setPosts', response.data)
                return response.data
            } catch (e) {
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },

        async fetchUsers({state, commit}) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitUser))
                commit('setUsers', response.data)
                return Array.from(response.data)
            } catch (e) {
                alert('Ошибка')
            }
        },

        removePost({state, commit}, post) {
            commit('setPosts', state.posts.filter(p => p.id !== post.id))
        },
        createPost({state, commit}, post) {
            state.posts.push(post)
        },
        changePage({commit}, pageNumber) {
            commit('setPage', pageNumber)
        },
    },

    namespaced: true
}