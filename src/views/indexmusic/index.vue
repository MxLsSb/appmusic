<style lang="scss" scoped>
.indexmusic {
  overflow-y: scroll;

  h3 {
    font-weight: normal;
    padding: 2% 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }

  h3::before {
    content: "|";
    color: #c20c0c;
    font-size: 12px;
    background: #c20c0c;
    margin: 0 5px;
    position: relative;
    top: -1px;
  }

  .albumList {
    .list {
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 33.33%;

          div {
            width: 100%;

            img {
              width: 100%;
              display: block;
            }
          }

          p {
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }

  .recommendList {
    ul {
      li {
        overflow: hidden;
        border-top: 1px solid #ccc;

        span.index {
          float: left;
          height: 40px;
          width: 40px;
          line-height: 40px;
          text-align: center;
        }

        div {
          float: left;
          padding: 4px 0;

          p {
            font-size: 12px;
          }
        }

        span.icon-bofang {
          float: right;
          height: 40px;
          width: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 26px;
        }
      }

      li:first-child {
        border-top: none;
      }
    }
  }
}
</style>
<template>
  <div class="indexmusic"
       v-height="50">
    <swiper :swiperArr="swiperArr"></swiper>
    <!-- 专辑列表 -->
    <div class="albumList">
      <h3>专辑列表</h3>
      <div class="list">
        <ul>
          <li v-for="(item,index) of albumList"
              @click="showAlbum(index,item)">
            <div>
              <img :src="item.albumImgSrc"
                   alt="">
            </div>
            <p>{{item.albumTitle}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 展示专辑页面 -->
    <div>
      <transition name="slide">
        <album v-if="$store.state.album.isShowAlbum"
               :albumItem="$store.state.album.album"></album>
      </transition>
    </div>
    <!-- 热歌列表 -->
    <div class="recommendList">
      <h3>热歌列表</h3>
      <div class="list">
        <ul>
          <li v-for="(item,index) of recommendList"
              @click="playRecommend(recommendList,index)">
            <span class="index">{{index+1}}</span>
            <div>
              <P>{{item.musicName}}</P>
              <P>{{item.musicSinger}}</P>
            </div>
            <span class="iconfont icon-bofang"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../../components/swiper";
import album from "../../components/album";
export default {
  data() {
    return {
      swiperArr: [
        {
          imgUrl:
            "http://p1.music.126.net/piXJCyIWqYGWEYy2AFnoBA==/19047939440081948.jpg"
        },
        {
          imgUrl:
            "http://p1.music.126.net/-pzOigsoJj3vZehOQqj6vA==/18801648837108169.jpg"
        },
        {
          imgUrl:
            "http://p1.music.126.net/JFBuZQCQJF9vCwsp3tnhzg==/18801648837108172.jpg"
        },
        {
          imgUrl:
            "http://p1.music.126.net/tN-BGO2bOm59xLvf7WOhCA==/18963277044745659.jpg"
        },
        {
          imgUrl:
            "http://p1.music.126.net/QlMwys9zc4Bg3Rm5qj8fsA==/19161189137713255.jpg"
        }
      ]
    };
  },
  components: { swiper, album },
  created() {
    // ①获取所有数据
    this.$store.dispatch("GETALL");
  },
  computed: {
    albumList() {
      return this.$store.state.mapList.albumList;
    },
    recommendList() {
      return this.$store.state.mapList.recommendList;
    }
  },
  methods: {
    showAlbum(index, item) {
      // 要更改isShowAlbum的状态，只有commit才能提交到mutation里面
      this.$store.commit("SHOWORHIDEALBUM", {
        isShowAlbum: true,
        index,
        album: item
      });
    },
    playRecommend(recommendList,index) {
      // 跳转进音乐播放器，传入热歌列表和当前播放音乐的下标
      this.$store.commit("PLAYAUDIO", {
        isShowPlayer: true,
        playType: 0, //0表示播放类型热歌
        musicList: recommendList,
        index,
        playerBg: recommendList[index].playerBg,
        albumImgSrc: recommendList[index].albumImgSrc
      });
    }
  }
};
</script>