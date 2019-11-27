<template>
  <div class="mypage">
    Community {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'community',
  data () {
    return {
      msg: '좆목질하자'
    }
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
</style>
