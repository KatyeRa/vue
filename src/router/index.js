import Vue from 'vue'
import VueRouter from 'vue-router'
import Tracks from '../views/Tracks.vue'
import Playlists from '../views/Playlists.vue'
import Albums from '../views/Albums.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tracks',
    name: 'Tracks',
    component: Tracks
  },
  {
    path: '/playlists',
    name: 'Playlists',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Playlists.vue')
    }
  },
  {
    path: '/albums',
    name: 'Albums',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Albums.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
