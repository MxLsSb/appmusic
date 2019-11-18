<style lang="scss" scoped>
header {
  background: #c20c0c;
  position: relative;

  .caidan {
    width: 50px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
    color: #fff;
  }

  ul {
    overflow: hidden;
    width: 60%;
    margin: 0 auto;

    li {
      float: left;
      width: 33.333%;
      text-align: center;
      height: 50px;
      font-size: 26px;
      line-height: 50px;
      color: #fff;

      a {
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #fff;
        &:hover {
          cursor: pointer;
        }
      }
      .router-link-active {
        background-color: transparent;
        color: cyan;
      }
    }
  }

  .player {
    width: 50px;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
<template>
  <div id="app">
    <header>
      <p class="caidan iconfont icon-caidan"></p>
      <ul>
        <li class="iconfont"
            v-for="item of tabBar">
          <router-link :to="item.url"
                       :class="[item.fontClass,'db']"></router-link>
        </li>
      </ul>
      <p class="player iconfont icon-zhuanjiguangpan"
         @click="showAudio"></p>
    </header>
    <section>
      <router-view></router-view>
    </section>
    <!-- 展示音乐播放器 -->
    <div>
      <transition name="slide">
        <audio-player v-show="player.isShowPlayer"
                      :player="player"></audio-player>
      </transition>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "./components/audio.vue";
export default {
  name: "app",
  data() {
    return {
      tabBar: [
        { title: "音乐首页", fontClass: "icon-music", url: "/indexmusic" },
        {
          title: "发现音乐",
          fontClass: "icon-wangyiyunyinlezizhi-copy",
          url: "/findmusic"
        },
        { title: "我的音乐", fontClass: "icon-diantai", url: "/mymusic" }
      ]
    };
  },
  components: {
    AudioPlayer
  },
  methods: {
    showAudio() {
      // 跳转播放器页面
      this.$store.commit("SHOWORHIDEPLAYER", {
        isShowPlayer: true
      });
    }
  },
  computed: {
    player() {
      return this.$store.state.player;
    }
  }
};
</script>


