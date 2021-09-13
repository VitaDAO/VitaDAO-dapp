<template>
  <button
    type="button"
    class="btn"
    :class="{
      'btn-primary': type === 'primary',
      'btn-secondary': type === 'secondary',
      'btn-default': type === 'default',
      'btn-danger': type === 'danger',
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
      'btn-xl': size === 'xl',
      'btn-fullwidth': fullWidth,
      'btn-disabled': disabled,
    }"
    @click="handleClick"
  >
    <transition name="fade" mode="out-in">
      <fa v-if="loading" icon="spinner" spin class="mr-2" />
      <fa v-else-if="icon" :icon="icon" class="mr-2" />
    </transition>
    <slot />
  </button>
</template>

<script>
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'md',
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],

  setup(props, { emit }) {
    function handleClick(evt) {
      evt.preventDefault()

      if (!props.disabled) {
        emit('click', evt)
      }
    }

    return {
      handleClick,
    }
  },
}
</script>

<style scoped lang="postcss">
.btn {
  @apply inline-flex items-center border border-transparent transition-all duration-150;
}

.btn-disabled {
  @apply cursor-not-allowed;
}

.btn-primary {
  @apply text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600;
}

.btn-primary.btn-disabled {
  @apply bg-green-300 focus:ring-0;
}

.btn-secondary {
  @apply text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600;
}

.btn-secondary.btn-disabled {
  @apply bg-gray-300 focus:ring-0;
}

.btn-default {
  @apply border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700;
}

.btn-default.btn-disabled {
  @apply text-gray-300 focus:ring-0;
}

.btn-danger {
  @apply text-red-700 bg-red-200 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 border border-red-300;
}

.btn-danger.btn-disabled {
  @apply bg-red-100 text-red-300 focus:ring-0 border-transparent;
}

.btn-xs {
  @apply px-2.5 py-1.5 text-xs font-medium rounded shadow-sm;
}

.btn-sm {
  @apply px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm;
}

.btn-md {
  @apply px-4 py-2 text-sm font-medium rounded-md shadow-sm;
}

.btn-lg {
  @apply px-4 py-2 text-base font-medium rounded-md shadow-sm;
}

.btn-xl {
  @apply px-6 py-3 text-base font-medium rounded-md shadow-sm;
}

.btn-fullwidth {
  @apply w-full justify-center;
}
</style>
