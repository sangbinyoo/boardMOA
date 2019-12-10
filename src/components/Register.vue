<template>
  <b-container class="register" fluid>
    <h2>{{ msg }}</h2>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
      id="fieldset-1"
      label="아이디 *"
      label-for="input-id"
      >
        <b-form-input
        id="input-id"
        v-model="form.memberid""
        type="text"
        required
        class="mb-2 mr-sm-2"
        placeholder="아이디를 입력해주세요."
        ></b-form-input>
      </b-form-group>
      
      <b-form-group
      id="fieldset-2"
      label="비밀번호 *"
      label-for="input-pw"
      >
        <b-form-input
          id="input-pw"
          v-model="form.pw"
          type="password"
          required
          class="mb-2 mr-sm-2"
          ref="password"
          placeholder="안전한 비밀번호를 설정해주세요."
        ></b-form-input>
      </b-form-group>
      
      <b-form-group
      id="fieldset-3"
      label="비밀번호 확인 *"
      label-for="input-pw-check"
      >
        <b-form-input
          id="input-pw-check"
          v-model="form.pwcheck"
          type="password"
          required
          :state="validation"
          class="mb-2 mr-sm-2"
          placeholder="비밀번호를 다시 한번 입력해주세요."
        ></b-form-input>
        <b-form-invalid-feedback>설정한 비밀번호와 일치하지 않습니다.</b-form-invalid-feedback>
        <b-form-valid-feedback>설정한 비밀번호와 일치합니다.</b-form-valid-feedback>
      </b-form-group>
      <b-form-group
      id="fieldset-4"
      label="이름 *"
      label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          required
          class="mb-2 mr-sm-2"
          placeholder="성함을 입력해 주세요."
        ></b-form-input>
      </b-form-group>
      <!--
      <b-form-group
      id="fieldset-5"
      label="E-mail 주소"
      label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          class="mb-2 mr-sm-2"
          placeholder="E-mail 주소를 입력해 주세요."
        ></b-form-input>
      </b-form-group>
      -->

      <b-form-group
      id="fieldset-6"
      label="성별"
      label-for="input-sex">
        <b-form-radio v-model="form.sex" name="sex" value="M" checked="checked">남자</b-form-radio>
        <b-form-radio v-model="form.sex" name="sex" value="F">여자</b-form-radio>
      </b-form-group>

      <b-button type="submit" variant="primary">가입</b-button>
    </b-form>

    <!--회원가입 성공-->
    <b-button href="/login" v-else="show">로그인</b-button>
  </b-container>
</template>


<script>
  const axios = require('axios')
  export default {
    name: 'register',
    data () {
      return {
        form: {
          memberid: '',
          pw: ''
        },
        msg: '회원 가입',
        show: true
      }
    },
    computed: {
      validation () {
        return this.form.pw === this.form.pwcheck
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()

        // validation check
        if (!this.validation) {
          this.$refs.password.focus()
          return
        }
        axios.post('/api/user', {data: this.form}).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>


