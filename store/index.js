import axios from 'axios'

export const state = () => ({
  loggedIn: false,
  user: {
    username: '',
    id: ''
  },
})

export const getters = {
  isAuthenticated(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  },
}

export const mutations = {
  LOGIN(state, user) {
    state.loggedIn = true
    state.user.username = user.username
    state.user.id = user.id
  },

  LOGOUT(state) {
    state.loggedIn = false
    state.user.username = ''
    state.user.id = ''
  }
}


export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit(store, context) {
    // if the user has the loggedIn state cookie, re-set his state
    if (context.req.session.loggedIn) {
      store.commit('LOGIN', context.req.session.user)
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/auth/login', {
        username: username,
        password: password
      })
      commit('LOGIN', data)
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },

  async register({ commit }, { username, password }) {
    try {
      await axios.post('/api/auth/register', {
        username: username,
        password: password
      })
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },

  async logout({ commit }) {
    await axios.post('/api/auth/logout')
    commit('LOGOUT')
  },
}