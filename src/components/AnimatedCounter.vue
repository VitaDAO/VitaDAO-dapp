<template>
  <span>{{ tweeningValue.toFixed(decimals) }}</span>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    tweenDuration: {
      type: Number,
      default: 350,
    },
    decimals: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      tweeningValue: 0.0,
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.tween(oldVal, newVal)
    },
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      let that = this
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, this.tweenDuration)
        .onUpdate(function (object) {
          that.tweeningValue = object.tweeningValue
        })
        .start()

      animate()
    },
  },
}
</script>
