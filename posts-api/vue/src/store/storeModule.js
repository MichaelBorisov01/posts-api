import axios from "axios";
import ApolloClient, {gql} from 'apollo-boost';

export const storeModule = {
    state: () => ({
        users: [],
        posts: [],
        isPostLoading: false,
        totalPages: 0,
        page: 1,
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
                const client = new ApolloClient({
                    uri: 'https://graphqlzero.almansi.me/api'
                });
                client.query({
                    query: gql`
                        query($options: PageQueryOptions) {
                            posts(options: $options) {
                                data {
                                    id
                                    title
                                    body
                                }
                            }
                        }
                    `,
                    variables:
                        {
                            "options": {
                                "paginate": {
                                    "page": state.page,
                                    "limit": state.limitPost
                                }
                            }
                        }

                }).then((result) => {
                    commit('setPosts', result.data.posts.data)
                    commit('setTotalPages', Math.ceil(Array.from(result.data.posts.data).length / state.limitPost))
                })
            } catch (e) {
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },

        async fetchUsers({commit}) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                commit('setUsers', Array.from(response.data))
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
        createUser({state, commit}, user) {
            state.users.push(user)
        },
        changePage({commit}, pageNumber) {
            commit('setPage', pageNumber)
        },
    },

    namespaced: true
}