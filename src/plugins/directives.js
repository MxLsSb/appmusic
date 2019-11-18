export default (Vue) => {
  Vue.directive("height", {
    inserted(el, binding) {
      if (binding.value == undefined) {
        $(el).height($(window).height())
      } else {
        $(el).height($(window).height() - binding.value)
      }
    }
  })
  Vue.directive("width", {
    inserted(el, binding) {
      if (binding.value == undefined) {
        $(el).width($(window).width())
      } else {
        $(el).width($(window).width() - binding.value)
      }
    }
  })
}
