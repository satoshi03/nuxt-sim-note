<template>
  <v-layout
    column
    justify-center
    >
    <v-flex
      xs12
      sm9
      md6>
      <v-card min-height=600>
        <div class="note-title">
        <v-card-title>
          <medium-editor :text='myTitle' :options='options' custom-tag='h2' v-on:edit='applyTitleEdit' />
        </v-card-title>
        </div>
        <div class="note-content">
        <v-card-text height=500>
          <medium-editor :text='myContent' :options='options' custom-tag='h2' v-on:edit='applyContentEdit' />
        </v-card-text>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters  } from 'vuex'

export default {
  data () {
    return {
      myTitle: 'タイトル',
      myContent: '内容',
      options: {}
    }
  },
  computed: {
    ...mapState(['user', 'note'])
  },
  methods: {
    ...mapActions(['setNote']),
    applyTitleEdit (ev) {
      if (ev.event.target) {
        this.myTitle = ev.event.target.innerHTML
        this.setCurrentNote()
      }
    },
    applyContentEdit (ev) {
      if (ev.event.target) {
        this.myContent = ev.event.target.innerHTML
        console.log(ev.event.target.innerHTML)
        this.setCurrentNote()
      }
    },
    setCurrentNote () {
      this.setNote(
       {
         user: {
           id: 0,
           name: this.user.displayName,
           image: this.user.photoURL,
         },
         note: {
           title: this.myTitle,
           contents: this.myContent,
           thumb: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
           like: 0,
         }
       }
     )
    }
  }
}
</script>
 
<style>
.note-title {
  padding: 40px;
  padding-bottom: 20px;
}

.note-content {
  padding: 10px 40px;
}
</style>
