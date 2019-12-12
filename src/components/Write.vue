<template>
  <b-container class="login" fluid>
    <h2>{{ msg }}</h2>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="아이디"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.memberid"
          type="text"
          required
          placeholder="아이디 입력"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-pw"
        label="비밀번호"
        label-for="input-pw"
      >
        <b-form-input
          id="input-pw"
          v-model="form.pw"
          type="password"
          required
          placeholder="비밀번호 입력"
        ></b-form-input>
      </b-form-group>      

      <b-button type="submit" variant="info">로그인</b-button>
      <b-button href="/register" variant="info">회원가입</b-button>
    </b-form>
  </b-container>
</template>


<script>
  const axios = require('axios')
  export default {
    name: '커뮤니티',
    data () {
      return {
        form: {
          memberid: '',
          pw: ''
        },
        msg: '로그인',
        show: true
      }
    },
    created () {
      if (this.$cookies.isKey('user')) {
        this.$cookies.remove('user')
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        axios.post('/api/user/login', {data: this.form}).then(res => {
          if (res.data.status === 300) {
            // set cookie and redirect /
            this.$cookies.set('user', res.data.data)
            window.location.pathname = '/'
          } else {
            console.log('로그인을 확인해주세요')
          }
        })
      }
    }
  }
</script>


