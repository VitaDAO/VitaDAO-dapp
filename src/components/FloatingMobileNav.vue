<template>
  <div class="bottom-4 fixed flex items-center justify-between left-4 lg:hidden right-4 z-10">
    <div class="overflow-hidden rounded-full shadow-lg lg:shadow-none">
      <wallet-indicator-button />
    </div>

    <base-button @click="openNav" class="shadow-lg" type="primary" size="sm" icon="bars"
      >Menu</base-button
    >
  </div>
</template>

<script>
import WalletIndicatorButton from '@/components/WalletIndicatorButton'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    WalletIndicatorButton,
    BaseButton,
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
