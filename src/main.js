import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from "vue-router";
import directive from "./plugins/directives" 
import Vuex from "vuex"
Vue.use(VueRouter)
Vue.use(directive)
Vue.use(Vuex)
// vuex
const store = new Vuex.Store({
  state: {
    mapList: [],
    album: {
      isShowAlbum: false, //控制专辑页面显示隐藏，默认隐藏
      index: 0,
      album: {}
    },
    player: {
      isShowPlayer: false,
      index: null,
      playType:null,
      musicList:[],
      playerBg:null,
      albumImgSrc:null
    },
    playState:'all'
  },
  mutations: {
    GETALL(state, payload) {
      state.mapList = payload.mapList;
    },
    SHOWORHIDEALBUM(state, payload) {
      state.album.isShowAlbum = payload.isShowAlbum;
      state.album.index = payload.index;
      state.album.album = payload.album;
    },
    SHOWORHIDEPLAYER(state, payload) {
      state.player.isShowPlayer = payload.isShowPlayer;
    },
    PLAYAUDIO(state, payload) {
      state.player.isShowPlayer = payload.isShowPlayer;
      state.player.index = payload.index;
      state.player.playType = payload.playType;
      state.player.musicList = payload.musicList;
      state.player.playerBg = payload.playerBg;
      state.player.albumImgSrc = payload.albumImgSrc;
    }
  },
  actions: { // ②
    async GETALL({
      commit
    }) {
      var data = await fetch('../data/data.json').then(res => res.json());
      commit("GETALL", data)
      // 会报错，解决
      // 1.下载运行环境"babel-plugin-transform-runtime": "^6.23.0",在.babelrc文件中添加东西
    }
  },
  getter: {}
})
const routes = [{
  path: "/indexmusic",
  name: "音乐首页",
  component: require("./views/indexmusic/index.vue").default
}, {
  path: "/findmusic",
  name: "发现音乐",
  component: require("./views/findmusic/index.vue").default
}, {
  path: "/mymusic",
  name: "我的音乐",
  component: require("./views/mymusic/index.vue").default
}, {
  path: "*",
  redirect: "/indexmusic"
}];
const router = new VueRouter({
  mode: "history",
  routes
})
new Vue({
  el: '#app',
  // 注册
  store,
  router,
  render: h => h(App)
})
