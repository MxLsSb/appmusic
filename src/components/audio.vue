<style lang="scss" scoped>
.player {
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: #333;
    position: relative;
    color: #fff;
    span {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .content_cd {
    width: 100%;
    padding-top: 50px;
    position: relative;
    overflow: hidden;
    .cd {
      width: 100%;
      position: relative;
      animation: rotate 5s linear infinite paused;
      img.imgCd {
        width: 70%;
        margin: 0 auto;
        display: block;
        border-radius: 9999px;
        box-shadow: 0px 0px 30px #fff;
        border: 10px solid rgba(255, 255, 255, 0.6);
      }
      .singerImg {
        width: 40%;
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .cd.cur {
      animation-play-state: running;
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .swith {
      width: 110px;
      height: 165px;
      position: absolute;
      top: -18px;
      left: 62%;
      transform: translateX(-50%) rotate(-23deg);
      /*这个属性 调整 rotate 圆心点*/
      transform-origin: 15px 15px;
      transition: 1s ease all 0s;
      z-index: 5;
      img {
        width: 100%;
      }
    }
    .swith.cur {
      transform: translateX(-50%) rotate(0deg);
    }
  }
  .setting {
    padding-top: 50px;
    ul {
      overflow: hidden;
      margin: 0 auto;
      width: 70%;
      li {
        float: left;
        width: 25%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        color: #fff;
      }
    }
  }
  .timeBar {
    width: 100%;
    height: 40px;
    .startTime {
      width: 15%;
      height: 40px;
      line-height: 40px;
      font-size: 1px;
      text-align: right;
      color: rgba(255, 255, 255, 0.8);
    }
    .all_duration {
      width: 60%;
      height: 2px;
      margin: 19px 5%;
      span.duration {
        position: relative;
        height: 2px;
        width: 100%;
        background: red;
        display: block;
        span.currentTime {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          width: 20%;
          background: green;
          display: block;
        }
      }
    }
    .endTime {
      width: 15%;
      height: 40px;
      line-height: 40px;
      font-size: 1px;
      text-align: left;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .controller {
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 20%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        color: rgba(255, 255, 255, 0.7);
      }
      li.icon-bofang,
      li.icon-pause-20 {
        font-size: 48px;
      }
    }
  }
  .popWindowAudioPlay {
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 1s ease all 0s;
    .audioPlayList {
      position: absolute;
      bottom: -240px;
      left: 0;
      width: 100%;
      height: 240px;
      overflow-y: scroll;
      background: #fff;
      transition: 1s ease all 0s;
      div {
        overflow: hidden;
        height: 40px;
        span {
          float: right;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 24px;
        }
      }
      ul {
        li {
          border-top: 1px solid #ccc;
          overflow: hidden;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          text-indent: 1em;

          span {
            float: right;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 24px;
            position: relative;
            right: 10px;
          }
          p {
            /*文本一行显示*/
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            text-indent: 1em;
            width: 85%;
            float: left;
          }
        }
        li.cur {
          color: red;
        }
      }
    }
  }
  .popWindowAudioPlay.cur {
    opacity: 1;
    z-index: 2;
  }
  .popWindowAudioPlay.cur .audioPlayList {
    bottom: 0;
  }
}
.lyric {
  position: relative;
  overflow: hidden;
  ul {
    position: absolute;
    width: 100%;
    transition: 1s all ease 0s;
    li {
      text-align: center;
      font-size: 1px;
      line-height: 20px;
      color: #fff;
      min-height: 20px;
    }
    li.cur {
      color: red;
    }
  }
}
</style>
<template>
  <div class="player"
       v-height
       :style="{ background: '#223950 url(' +player.playerBg +') 0 0 / 100% 100% no-repeat' }">
    <span v-if="typeof player.index=='number'">
      <!-- 音乐播放 -->
      <audio :src="player.musicList[player.index].musicUrl"
             autoplay
             :loop="playState == 'once'"
             @timeupdate="play"
             id="audio"></audio>
    </span>
    <header>
      {{player.index==null?'播放器':player.musicList[player.index].musicName}}
      <span class="iconfont icon-houtui1"
            @click="goBack"></span>
    </header>
    <!-- 光盘 -->
    <div class="content_cd"
         v-show="!isShowLyric"
         v-height="300"
         @click="ShowLyric">
      <div class="swith"
           :class={cur:addSwithClass}>
        <img src="../../resource/img/swith.png"
             alt="">
      </div>
      <div class="cd"
           :class={cur:addSwithClass}>
        <img src="../../resource/img/cd.png"
             class="imgCd"
             alt="">
        <div class="singerImg">
          <img :src="player.albumImgSrc"
               alt="">
        </div>

      </div>
    </div>
    <!-- 歌词 -->
    <div class="lyric"
         v-show="isShowLyric"
         v-height="250"
         @click="hideLyric">
      <ul>
        <li v-for="item of lyric">{{item[1]}}</li>
      </ul>
    </div>
    <!-- 设置按钮 纯静态 -->
    <div class="setting">
      <ul>
        <li class="iconfont icon-xin1"></li>
        <li class="iconfont icon-xiazai1"></li>
        <li class="iconfont icon-pinglun"></li>
        <li class="iconfont icon-more-vert"></li>
      </ul>
    </div>
    <!-- 显示歌曲时长、进度条等 -->
    <div class="timeBar ovh">
      <!-- 过滤的调用直接在需要过滤的那里加竖线写方法 -->
      <p class="startTime fl">{{currentTime | zhuanhuan}}</p>
      <p class="all_duration fl">
        <!-- 进度条 duration代表音乐总时长 -->
        <span class="duration"
              @click="goTime($event)">
          <span class="currentTime"
                :style="{width:currentTime/duration*100+'%'}"></span>
        </span>
      </p>
      <p class="endTime fl">
        {{duration | zhuanhuan}}
      </p>
    </div>
    <!-- 音乐控制器 -->
    <div class="controller">
      <ul>
        <li class="iconfont icon-renwu_xh"></li>
        <li class="iconfont icon-previous"
            @click="goPrev"></li>
        <li class="iconfont"
            :class="[addSwithClass==true?'icon-pause-20':'icon-bofang']"
            @click="play_pause"></li>
        <li class="iconfont icon-next"
            @click="goNext"></li>
        <li class="iconfont icon-icon8"
            @click="showPopWindowAudioPlay"></li>
      </ul>
    </div>
    <!-- 音乐列表框 点击显示关闭 在里面可选择歌曲 -->
    <div class="popWindowAudioPlay"
         v-height
         :class="{cur:isShowPopWindowAudioPlay}">
      <div class="audioPlayList">
        <div>
          <span class="iconfont icon-guanbi"
                @click="close"></span></div>
        <ul>
          <li v-for="(item,index) of player.musicList"
              :class="{cur:index==player.index}"
              @click="audioPlayListIndex(index)">
            <p>{{item.musicSinger}}-{{item.musicName}}</p>
            <span class="iconfont icon-bofang"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["player"],
  data() {
    return {
      isShowLyric: false,
      addSwithClass: true, //磁头默认向下，播放状态
      lyric: [],
      currentTime: 0, //音乐已经播放的时间
      duration: 0, //音乐总时长，默认0
      isNext: true, //是否允许播放下一首
      isShowPopWindowAudioPlay: false //默认不显示音乐列表
    };
  },
  filters: {
    // vue中的过滤方法,
    zhuanhuan(s) {
      var t = "";
      // 时间转换，将秒转换为  197.5s转换为03：17
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;
      if (min < 10) {
        t += "0" + min + ":";
      } else {
        t = min + ":";
      }
      if (sec < 10) {
        // ~~相当于parseInt
        t += "0" + ~~sec;
      } else {
        t += ~~sec;
      }
      return t;
    }
  },
  watch: {
    index() {
      var vm = this;
      //获取歌词
      if (this.index != null) {
        if (this.player.musicList[this.index].lyric) {
          $.get(this.player.musicList[this.index].lyric, data => {
            // console.log(data);
            vm.lyric = vm.parseLyric(data);
          });
        }
      }
    }
  },
  computed: {
    index() {
      return this.player.index;
    },
    playState() {
      return this.$store.state.playState;
    }
  },
  methods: {
    goBack() {
      this.$store.commit("SHOWORHIDEPLAYER", {
        isShowPlayer: false
      });
    },
    hideLyric() {
      this.isShowLyric = false;
    },
    ShowLyric() {
      this.isShowLyric = true;
      var vm = this;
      //获取歌词
      if (this.index != null) {
        if (this.player.musicList[this.index].lyric) {
          $.get(this.player.musicList[this.index].lyric, data => {
            // console.log(data);
            vm.lyric = vm.parseLyric(data);
          });
        }
      }
    },
    parseLyric(lyric) {
      // 获取歌词，并把歌词进行解析
      var lines = lyric.split(/\n/);
      console.log(lines);
      var getLyricTime = /\[\d{2}:\d{2}.\d{2}\]/g;
      var arr = [];
      while (!getLyricTime.test(lines[0])) {
        // lines.shift();
        lines = lines.splice(1);
      }
      while (lines[lines.length - 1].length == 0) {
        lines.pop();
      }
      lines.forEach(item => {
        var index = item.indexOf("]");
        var time = item.substr(1, index - 1);
        var timeArr = time.split(":");
        var sec = timeArr[0] * 60 + parseFloat(timeArr[1]);
        var geci = item.substr(index + 1);
        arr.push([sec, geci]);
      });
      console.log(arr);
      arr.sort(function(a, b) {
        return a[0] - b[0];
      });
      return arr;
    },
    goPrev() {
      // 播放上一首
      this.addSwithClass = true;
      if (this.index == 0) {
        this.playIndex(0);
      } else {
        this.playIndex(this.index - 1);
      }
    },
    goNext() {
      // 播放下一首
      this.addSwithClass = true;
      if (this.index >= this.player.musicList.length - 1) {
        // 当前播放下标大于音乐列表中最大下标，播放第一首
        this.playIndex(0);
      } else {
        this.playIndex(this.index + 1);
      }
    },
    playIndex(index) {
      // 指定下标
      this.addSwithClass = true;
      if (this.$store.state.player.playType == 0) {
        this.$store.commit("PLAYAUDIO", {
          isShowPlayer: true,
          playType: 0,
          musicList: this.player.musicList,
          index,
          playerBg: this.player.musicList[index].playerBg,
          albumImgSrc: this.player.musicList[index].albumImgSrc
        });
      } else if (this.$store.state.player.playType == 1) {
        this.$store.commit("PLAYAUDIO", {
          isShowPlayer: true,
          playType: 1,
          musicList: this.player.musicList,
          index,
          playerBg: this.player.playerBg,
          albumImgSrc: this.player.albumImgSrc
        });
      }
    },
    play() {
      // 当音乐播放过程中，时间变化就会触发该事件
      var currentTime = $("#audio")[0].currentTime;
      var duration = $("#audio")[0].duration;
      var paused = $("#audio")[0].paused;
      var ended = $("#audio")[0].ended;
      if (ended && this.isNext) {
        this.isNext = false;
        if (this.index == this.player.musicList.length - 1 && ended) {
          $("#audio")[0].pause();
          this.addSwithClass = false;
        } else {
          // 播放下一首
          this.goNext();
        }
        this.isNext = true;
      }
      // 判断音乐是否暂停，
      if (!paused) {
        this.addSwithClass = true;
      }
      this.currentTime = currentTime; //更新播放时间
      this.duration = duration; //更新音乐总时长
      // 歌词运动
      this.lyric.forEach((item, index) => {
        if (this.currentTime > item[0]) {
          $(".lyric ul li").removeClass("cur");
          $(".lyric ul li")
            .eq(index)
            .addClass("cur");
          $(".lyric ul").css(
            "top",
            $(".lyric").height() / 2 - 20 * (index + 1)
          );
        }
      });
    },
    goTime(event) {
      // 点击进度条，改变播放时间，点击的位置/进度条总宽度*当前歌曲总时间
      $("#audio")[0].currentTime =
        (event.offsetX / $(".duration").width()) * this.duration;
    },
    play_pause() {
      // 播放暂停
      var paused = $("#audio")[0].paused;
      if (paused) {
        this.addSwithClass = true;
        $("#audio")[0].play();
      } else {
        this.addSwithClass = false;
        $("#audio")[0].pause();
      }
    },
    showPopWindowAudioPlay() {
      // 点击音乐列表，弹出列表框
      this.isShowPopWindowAudioPlay = true;
    },
    close() {
      this.isShowPopWindowAudioPlay = false;
    },
    audioPlayListIndex(index) {
      this.playIndex(index);
      this.close();
    }
  }
};
</script>