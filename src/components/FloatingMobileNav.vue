<template>
  <div class="bottom-4 fixed flex items-center justify-between left-4 lg:hidden right-4 z-10">
    <wallet-indicator-button />
    <button
      class="
        bg-gray-700
        border border-transparent
        duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2
        font-bold
        hover:bg-gray-600
        px-5
        py-3
        rounded-xl
        shadow-lg
        text-sm text-white
        transition-all
      "
      @click="openNav"
    >
      <fa icon="bars" size="lg" />
    </button>
  </div>
</template>

<script>
import WalletIndicatorButton from '@/components/WalletIndicatorButton'

export default {
  components: {
    WalletIndicatorButton,
  },
  props: {},
  emits: ['open-nav'],

  setup(props, { emit }) {
    function openNav() {
      emit('open-nav')
    }

    return {
      openNav,
    }
  },
}
</script>
