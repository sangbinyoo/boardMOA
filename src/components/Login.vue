<template>
  <b-container class="login" fluid>
    <h2>{{ msg }}</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>


<script>
  export default {
    name: 'login',
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
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>


