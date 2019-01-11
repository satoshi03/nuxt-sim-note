export const strict = false

export const state = () => ({
  user: null,
  note: null,
  key: '',
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setNote (state, payload) {
    state.note = payload
  },
  setKey (state, payload) {
    state.key = payload
  }
}

export const actions = {
  setUser ({ commit  }, payload) {
    commit('setUser', payload)
  },
  setNote ({ commit }, payload) {
    commit('setNote', payload)
  },
  setKey ({ commit }, payload) {
    commit('setKey', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}
