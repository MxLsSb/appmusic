<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="item of swiperArr">
          <img :src="item.imgUrl"
               alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["swiperArr"],
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: 3000,
      pagination: ".swiper-pagination"
    });
  }
};
</script>