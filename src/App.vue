<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">보드 모아</b-navbar-brand>
        <b-button href="/login">로그인</b-button>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">홈</b-nav-item>
            <b-nav-item-dropdown text="보드 게임" no-caret>
              <b-dropdown-item href="/game/tichu">티츄</b-dropdown-item>
              <b-dropdown-item href="/game/sedu">세듀</b-dropdown-item>
              <b-dropdown-item href="/game/climb">자작게임</b-dropdown-item>
              <b-dropdown-item href="/game">더 보기..</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="/community">커뮤니티</b-nav-item>
            <b-nav-item href="/notice">공지사항</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main>
      <img src="./assets/title_banner.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}
header nav{
  z-index: 10;
}
</style>
