<template>
  <v-layout
    column
    justify-center
    >
    <v-flex
      xs12
      sm9
      md6>
      <v-card min-width=300 min-height=600>
        <div class="note-title">
        <v-card-title>
          <medium-editor :text='myTitle' :options='options' custom-tag='h2' />
        </v-card-title>
        <div class="user-panel">
          <v-avatar size=38>
            <img
              :src="user.image"
            />
          </v-avatar>
          <span class="user-name">
            {{ user.name }}
          </span>
        </div>
        </div>
        <div class="note-content">
        <v-card-text height=500>
          <medium-editor :text='myContent' :options='options' custom-tag='h2' />
        </v-card-text>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data () {
    return {
      myTitle: '',
      myContent: '',
      user: {},
      options: {
        disableEditing: true,
      },
    }
  },
  created: function () {
    const database = firebase.database()
    const notesRef = database.ref('notes')
    const key = this.$route.query.ni
    const _this = this
    const note = notesRef.child(key).once('value').then(
      function(snapshot) {
        const ss = snapshot.val()
        _this.myTitle = ss.note.title
        _this.myContent = ss.note.contents
        _this.user = ss.user
      }
    )
  },

}
</script>

<style>
.note-title {
  padding: 40px;
  padding-bottom: 20px;
  font-size: 36px;
}

.note-content {
  padding: 10px 40px;
}

.user-panel {
  padding-left: 20px;
}

.user-name {
  padding-left: 10px;
  font-size: 18px;
}
</style>
