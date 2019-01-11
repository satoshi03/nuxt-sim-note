export const strict = false

export const state = () => ({
  user: null,
  note: null,
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setNote (state, payload) {
    state.note = payload
  }
}

export const actions = {
  setUser ({ commit  }, payload) {
    commit('setUser', payload)
  },
  setNote ({ commit }, payload) {
    commit('setNote', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}
