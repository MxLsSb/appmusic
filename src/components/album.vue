<style lang="scss" scoped>
.albumView {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;
  overflow-y: scroll;

  header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    position: relative;

    /* background: #c20c0c; */
    span {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      color: #fff;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .content_detail {
    width: 100%;

    .content_detail_top {
      overflow: hidden;
      margin-top: 20px;
      padding: 0 16px;

      img {
        width: 110px;
        height: 110px;
        display: block;
        float: left;
      }

      .detail {
        float: left;
        margin-top: 10px;
        margin-left: 20px;

        p {
          color: #fff;
          padding: 5px 0;
        }

        p:nth-child(1) {
          font-size: 16px;
        }

        p:nth-child(2) {
          font-size: 14px;
          overflow: hidden;

          .avatar {
            width: 26px;
            height: 26px;
            border-radius: 99px;
          }

          * {
            float: left;
          }

          span {
            display: block;
            height: 26px;
            line-height: 26px;
            padding-left: 5px;
          }
        }
      }
    }

    .content_detail_bottom {
      padding: 15px 0;

      ul {
        overflow: hidden;

        li {
          float: left;
          width: 25%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 26px;
        }
      }
    }
  }

  .albumNavList {
    overflow-y: scroll;

    ul {
      li {
        height: 50px;

        span {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          float: left;
        }

        div {
          float: left;

          p {
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            color: #989898; /* 文本一行显示 */
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          p:nth-child(1) {
            font-size: 14px;
            color: #333; /* 文本一行显示 */
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }

        .play {
          float: left;
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 26px;
          color: #333;
        }
      }
    }
  }
}
</style>
<template>

  <div class="albumView"
       v-height>
    <div :style="{background:'url('+albumItem.albumBg+') 0 0 / 100% 100% no-repeat'}">
      <header>
        {{albumItem.albumTitle}}
        <span class="iconfont icon-houtui1"
              @click="goBack"></span>
      </header>
      <div class="content_detail">
        <div class="content_detail_top">
          <img :src="albumItem.albumImgSrc"
               alt="">
          <div class="detail">
            <p class="album">专辑:{{albumItem.albumTitle}}</p>
            <p class="singer"><img :src="albumItem.albumImgSrc"
                   class="avatar"
                   alt="">
              <span>歌手:{{albumItem.albumSinger}}</span></p>
          </div>
        </div>
        <div class="content_detail_bottom">
          <ul>
            <li class="iconfont icon-tianjia"></li>
            <li class="iconfont icon-pinglun"></li>
            <li class="iconfont icon-fenxiang2"></li>
            <li class="iconfont icon-xiazai1"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="albumNavList">
      <ul>
        <li v-for="(item,index) of albumItem.albumMusicList"
            class="ovh"
            @click="playAlbum(albumItem.albumMusicList,index)">
          <span class="fl db">{{index+1}}</span>
          <div class="fl"
               v-width="100">
            <p>{{item.musicName}}</p>
            <p>{{item.musicSinger}}</p>
          </div>
          <div class="play fr iconfont icon-bofang"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["albumItem"],
  methods: {
    goBack() {
      this.$store.commit("SHOWORHIDEALBUM", {
        isShowAlbum: false
      });
    },
    playAlbum(albumMusicList,index) {
      // 跳转音乐播放器，传入当前专辑的音乐列表和当前正在播放的音乐的下标
      this.$store.commit("PLAYAUDIO", {
        isShowPlayer: true,
        playType: 1, //1表示播放类型是专辑
        musicList: albumMusicList,
        index,
        playerBg: this.albumItem.playerBg,
        albumImgSrc: this.albumItem.albumImgSrc
      });
    }
  }
};
</script>