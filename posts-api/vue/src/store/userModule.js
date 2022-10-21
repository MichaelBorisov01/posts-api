import axios from "axios";

export const userModule = {
    state: () => ({
        users: [],
        limit: 9,
        totalPages: 0,
    }),

    getters: {},
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchUsers({state, commit}) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setUsers', response.data)
                return response.data
            } catch (e) {
                alert('Ошибка')
            }
        }
    },

    namespaced: true
}