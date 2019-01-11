<template>
  <v-app>
    <v-toolbar
      color="white"
      fixed
      app
    >
    <v-toolbar-title class="toolbar-title" v-text="title" @click="toHome()" />
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isAuthenticated()" class="toolbar-items">
      <v-avatar @click="toggle('logout')" class="toolbar-avator" size=38>
        <img
          :src="user.photoURL"
        />
      </v-avatar>
      <v-btn v-if="isAuthenticated() && toggleLogout" class="toolbar-button toolbar-login-logout" color="#666666" @click="doLogout" outline>ログアウト</v-btn>
      <v-btn v-if="!isNote()" class="toolbar-button" color="#2cb696" to="note" outline>投稿</v-btn>
      <v-btn v-if="isNote()" class="toolbar-button" color="#2cb696"  @click="publishNote()" outline>公開</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isAuthenticated()" class="toolbar-items">
      <v-btn v-if="!isAuthenticated()" class="toolbar-button toolbar-login-logout" color="#2cb696" @click="doLogin" outline>ログイン</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters  } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      title: 'not note',
      toggleLogout: false,
    }
  },
  created: function () {
    this.setUser(null)
    this.isNote()
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user ? user : null)
    })
  },
  computed: {
    ...mapState(['user', 'note']),
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
    isNote() {
      return this.$route.path == '/note'
    },
    toggle (button) {
      if (button == 'logout') {
        this.toggleLogout = !this.toggleLogout
      }
    },
    publishNote() {
      console.log(this.note)
      firebase.database().ref('notes').push(this.note)
    },
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),
    doLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    doLogout() {
      firebase.auth().signOut()
    },
  }
}
</script>

<style>
* {
  color: #222222
}

.toolbar {
  background-color: white;
}

.toolbar-title {
  font-size: 24px;
  font-weight: bold;
}

.toolbar-items {
  align-items: center;
}

.toolbar-button {
  height: 60% !important;
  font-size: 14px;
  color: white;
  background-color: #2cb696 !important;
  min-height: 32px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px !important;
  letter-spacing: 0.3em;
}

.toolbar-login-logout `{
  letter-spacing: 0.05em !important;
}
</style>
