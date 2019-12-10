import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Mypage from '@/components/Mypage'
import Community from '@/components/Community'
import Notice from '@/components/Notice'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      redirect: '/login',
      name: 'Logout'
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: Mypage
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ],
  mode: 'history'
})
