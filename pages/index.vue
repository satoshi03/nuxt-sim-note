<template>
  <v-layout
    wrap
    column
    justify-center
    >
    <v-flex
      xs12
      sm8
      md6
      offset-md2
      v-for="(item, index) in notes.slice().reverse()"
      :key="index"
      >
      <v-card max-width="700px" min-width="300px">
        <v-card-text>
          <v-avatar size=34>
            <img
              :src="item.user.image"
            />
          </v-avatar>
          <span class="card-user-name">{{ item.user.name }}</span>
        </v-card-text>
        <v-img
          class="white--text"
          height="230px"
          :src="item.note.thumb"
        />
        <v-card-title class="card-title-panel">
          <div>
            <a :href="getURL(item.key)"><span class="card-title" v-html="item.note.title"></span></a>
          </div>
        </v-card-title>
        <v-card-text class="card-content-text">
          <span v-html="getContent(item.note.contents)">
          </span>
        </v-card-text>
        <v-card-text class="card-note-link">
          <a :href="getURL(item.key)">
            もっとみる
          </a>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div>
            <v-icon>far fa-heart heart</v-icon>
            <span class="like-num">{{ item.note.like }}</span>
          </div>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters  } from 'vuex'

export default {
  data () {
    return {
      notes: [],
      maxLength: 60,
    }
  },
  created: function () {
    this.database = firebase.database()
    this.notesRef = this.database.ref('notes')
    this.notesRef.limitToLast(20).on('child_added', snapshot => {
      const ss = snapshot.val()
      console.log(ss)
      var key = this.notes.push({
        key: ss.key,
        user: ss.user,
        note: ss.note,
      })
    })
  },
  methods: {
    getContent (content) {
      console.log(content)
      if (content.length > this.maxLength) {
        return content.substr(0, this.maxLength) + "..."
      } else {
        return content
      }
    },
    getURL (key) {
      return '/notes?ni=' + key
    }
  }
}
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Hiragino Kaku Gothic ProN, "ヒラギノ角ゴ ProN W3", Arial, "メイリオ", Meiryo, sans-serif;
}
.card-user-name {
  padding-left: 10px;
  font-size: 12px;
  font-weight: bold;
}

.card-title-panel {
  padding-top: 10px;
  padding-bottom: 10px;
}

.card-title {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Hiragino Kaku Gothic ProN, "ヒラギノ角ゴ ProN W3", Arial, "メイリオ", Meiryo, sans-serif;
  font-size: 20px;
  font-feature-settings: 'palt' 1;
  letter-spacing: 0.04em;
  line-height: 1.5;
  font-weight: bold;
}

.card-title-panel a {
  text-decoration: none;
  cursor: pointer;
}

.card-content-text {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Hiragino Kaku Gothic ProN, "ヒラギノ角ゴ ProN W3", Arial, "メイリオ", Meiryo, sans-serif;
  padding-top: 0px;
}

.card-note-link {
  font-size: 14px;
  padding-top: 5px;
}

.card-note-link a {
  text-decoration: none;
  color: #249f80;
  cursor: pointer;
}

.heart {
  padding-left: 10px;
}

.like-num {
  font-size: 16px;
}
</style>
