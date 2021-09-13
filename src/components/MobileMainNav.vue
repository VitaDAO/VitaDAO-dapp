<template>
  <transition-root as="template" :show="open">
    <Dialog as="div" static class="fixed flex inset-0 z-40" :open="open" @close="close">
      <transition-child
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <dialog-overlay class="bg-gray-600 bg-opacity-75 fixed inset-0" />
      </transition-child>
      <transition-child
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="bg-gray-800 flex flex-1 flex-col max-w-18 pb-4 pt-5 relative w-full">
          <transition-child
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="-mr-12 absolute bottom-0 pb-5 right-0">
              <button
                type="button"
                class="
                  flex
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
                  h-10
                  items-center
                  justify-center
                  ml-1
                  rounded-full
                  w-10
                "
                @click="close"
              >
                <span class="sr-only">Close sidebar</span>
                <x-icon class="h-6 text-white w-6" aria-hidden="true" />
              </button>
            </div>
          </transition-child>
          <div class="flex flex-shrink-0 items-center px-5">
            <img src="../assets/logo.svg" class="h-6 w-auto" alt="VitaDAO" />
          </div>
          <div class="flex-1 h-0 mt-5 overflow-y-auto">
            <nav class="px-5 space-y-1">
              <router-link
                v-for="item in navItems"
                :key="item.name"
                :to="item.to"
                :class="[
                  $route.path === item.to
                    ? 'bg-gray-600 text-white'
                    : 'text-white hover:bg-gray-700',
                  'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                ]"
              >
                <fa
                  fixed-width
                  class="flex-shrink-0 ml-1 mr-3 text-vita-accent"
                  :icon="item.icon"
                  aria-hidden="true"
                  size="lg"
                />
                {{ item.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </transition-child>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </transition-root>
</template>

<script>
import { defineComponent } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    navItems: {
      type: Array,
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
})
</script>
