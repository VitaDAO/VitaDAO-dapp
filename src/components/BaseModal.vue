<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <transition-root as="template" :show="open">
    <Dialog as="div" static class="fixed inset-0 overflow-y-auto z-10" :open="open" @close="close">
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pb-28
          pt-4
          px-4
          sm:block sm:p-0
          text-center
        "
      >
        <transition-child
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <dialog-overlay class="bg-gray-500 bg-opacity-75 fixed inset-0 transition-opacity" />
        </transition-child>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:align-middle sm:h-screen sm:inline-block" aria-hidden="true"
          >&#8203;</span
        >
        <transition-child
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              align-bottom
              bg-white
              inline-block
              overflow-hidden
              pb-4
              pt-5
              px-4
              rounded-lg
              shadow-xl
              sm:align-middle sm:max-w-sm sm:my-8 sm:p-6 sm:w-full
              text-left
              transform
              transition-all
            "
          >
            <slot />
          </div>
        </transition-child>
      </div>
    </Dialog>
  </transition-root>
</template>

<script>
// import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  // DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

export default {
  components: {
    DialogOverlay,
    // DialogTitle,
    TransitionChild,
    TransitionRoot,
    // CheckIcon,
    Dialog, // eslint-disable-line vue/no-unused-components
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    function close() {
      emit('update:open', false)
    }

    return {
      close,
    }
  },
}
</script>
