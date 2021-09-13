<template>
  <div class="prose" v-html="html" />
</template>

<script>
import { defineComponent, computed } from 'vue'
import MarkdownIt from 'markdown-it'

export default defineComponent({
  components: {},
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let md = new MarkdownIt()

    const html = computed(function () {
      return md.render(props.source)
    })

    return {
      html,
    }
  },
})
</script>
