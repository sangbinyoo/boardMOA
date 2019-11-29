<template>
  <div class="notice">
    Notice {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: [
    'table'
  ],
  data () {
    return {
      msg: 'notice'
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
