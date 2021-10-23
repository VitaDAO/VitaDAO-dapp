<template>
  <ul role="list" class="mt-4 gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
    <li
      v-for="ipnft in ipnfts"
      :key="ipnft.id"
      class="
        bg-gradient-to-b
        from-gray-800
        to-gray-900
        col-span-1
        divide-gray-200 divide-y
        flex flex-col
        rounded-lg
        shadow
      "
    >
      <div class="max-w-lg mx-auto grid gap-5 lg:max-w-none">
        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <img class="h-48 w-full object-cover" :src="ipnft.image" alt="" />
          </div>
          <div class="flex-1 p-6 flex flex-col justify-between">
            <div class="flex-1">
              <a href="#" class="block">
                <p class="text-xl font-semibold text-white">{{ ipnft.name }}</p>
                <p class="mt-3 text-base text-white line-clamp-3">
                  {{ ipnft.description }}
                </p>
              </a>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-white">
                <a href="#" class="hover:underline"> {{ ipnft.properties.research_lead }} </a>
              </p>
              <div class="flex truncate">
                <a href="#">
                  <span class="sr-only">{{ ipnft.properties.research_lead }}</span>
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1170739893422755840/WrQL2WoC_400x400.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div class="mt-2">
              <a href="#" class="inline-block">
                <span
                  class="
                    inline-flex
                    items-center
                    px-3
                    py-0.5
                    rounded-full
                    text-sm
                    font-medium
                    bg-green-100
                    text-green-800
                  "
                >
                  {{ ipnft.properties.industry }}
                </span>
              </a>
              <a href="#" class="inline-block px-1">
                <span
                  class="
                    inline-flex
                    items-center
                    px-3
                    py-0.5
                    rounded-full
                    text-sm
                    font-medium
                    bg-blue-100
                    text-blue-800
                  "
                >
                  {{ ipnft.properties.agreement_type }}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    ipnfts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
