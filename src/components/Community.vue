<template>
  <div class="community">
    <p>{{ msg }}</p>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(상세보기)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}}
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2 u-contents">
            <b-col sm="3" class="text-sm-right"><b>내용</b></b-col>
            <b-col>{{ row.item.내용 }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>등록일</b></b-col>
            <b-col>{{ row.item.등록일 }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <b-button size="sm" v-b-modal.write @click="writeText">글쓰기</b-button>
    <b-modal id="write" hide-header @ok="sendWrite">
      <p class="my-4">
        <b-form @submit=sendWrite>
          <b-form-group
          id="fieldset-1"
          label="제목"
          label-for="input-title"
          >
            <b-form-input
            id="input-title"
            v-model="form.title""
            type="text"
            required
            class="mb-2 mr-sm-2"
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            id="fieldset-6"
            label="카테고리"
            label-for="input-category"
          >
            <b-form-select v-model="form.category" :options="options" size="sm"
            id="input-category" class="mt-3"
            ></b-form-select>
          </b-form-group>          
          
          <b-form-group
          id="fieldset-2"
          label-for="input-content"
          >
            <b-form-textarea
              id="input-content"
              v-model="form.content"
              required
              rows="10"
              max-rows="20"
              class="mb-2 mr-sm-2"
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </p>
    </b-modal>    
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'community',
  data () {
    return {
      msg: '커뮤니티 게시판',
      fields: ['No', '카테고리', '제목', '작성자', '상세보기'],
      options: [
        { value: ' ', text: '잡담' },
        { value: '티츄', text: '티츄' },
        { value: '세듀', text: '세듀' },
        { value: '기타', text: '기타' }
      ],
      items: [],
      form: {
        title: '',
        category: ' ',
        content: '',
        writer: ''
      }
    }
  },
  methods: {
    writeText: function () {
      if (!this.$cookies.isKey('user')) {
        window.location.pathname = '/login'
      }
    },
    sendWrite (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.form.writer = this.$cookies.get('user').id
      axios.post('/api/community', {form: this.form}).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    }
  },
  beforeCreate () {
    axios.get('/api/community').then(res => {
      this.items = res.data.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
p { text-align: left;
  font-size:x-large;
  padding-left:50px;
}
.u-contents {
  height:100px;
}
</style>
