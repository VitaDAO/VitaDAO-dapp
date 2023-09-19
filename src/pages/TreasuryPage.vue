<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <template v-if="status === 'loading'">
      <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-xl sm:text-2xl md:text-3xl">
        Treasury
      </h2>
      <LoadingIndicator>Loading treasury data…</LoadingIndicator>
    </template>
    <template v-else-if="status === 'error'">
      <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-xl sm:text-2xl md:text-3xl">
        Treasury
      </h2>
      <ErrorIndicator>{{ error.message || 'Error while fetching treasury data.' }}</ErrorIndicator>
    </template>
    <template v-else-if="status === 'success'">
      <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-xl sm:text-2xl md:text-3xl">
        {{ `Treasury · $${formatNumber(treasury.value)}` }}
      </h2>
      <div class="grid grid-cols-1 gap-3 sm:gap-6">
        <div class="flex flex-col gap-3">
          <p class="text-xs sm:text-base">
            The data presented on this page is obtained through manual updates or collected from
            third-party APIs, and is provided solely for informational purposes. While we strive to
            maintain the highest level of accuracy, some data may be incomplete or outdated. If you
            identify any errors, please notify us via our
            <a href="https://discord.com/invite/3S3ftnmZYD" class="underline">Discord</a>.
          </p>
        </div>
        <!-- Assuming treasury is split in sections -->
        <div
          v-for="section in treasury.children"
          class="border border-gray-300 p-3 sm:p-6 rounded-2xl flex flex-col gap-3"
          :key="section.label"
        >
          <h3 class="text-base sm:text-lg md:text-xl flex items-center gap-3 justify-between">
            <span>{{ `${section.label} · $${formatNumber(section.value)}` }}</span>
            <span class="text-xs sm:text-sm bg-gray-200 rounded-full px-3 py-1 leading-none">
              {{ `${formatNumber(section.percent)}%` }}
            </span>
          </h3>
          <p v-if="section.comment" class="text-xs sm:text-base">{{ section.comment }}</p>
          <!-- Section has subsections -->
          <template v-if="typeOfChildren(section) === 'group'">
            <template v-for="subsection of section.children" :key="subsection.label">
              <div v-if="subsection.value >= 100">
                <h4 class="font-bold py-2 text-xs sm:text-base">{{ subsection.label }}</h4>
                <template
                  v-if="['fungible-asset', 'generic-asset'].includes(typeOfChildren(subsection))"
                >
                  <AssetRow
                    v-for="asset of subsection.children.filter((asset) => asset.value > 1)"
                    :key="asset.label + asset.secondaryLabel"
                    :asset="asset"
                  />
                </template>
              </div>
            </template>
          </template>
          <!-- Section just contains a list of assets -->
          <template v-if="['fungible-asset', 'generic-asset'].includes(typeOfChildren(section))">
            <div>
              <h4 class="font-bold py-2 text-xs sm:text-base">Assets</h4>
              <AssetRow
                v-for="asset of section.children.filter((asset) => asset.value > 1)"
                :key="asset.label + asset.secondaryLabel"
                :asset="asset"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import AssetRow from '@/components/AssetRow'
import ErrorIndicator from '@/components/ErrorIndicator'
import LoadingIndicator from '@/components/LoadingIndicator'
import { formatNumber } from '@/utils'
import { useTreasury } from '@/utils/queries'

const { data: treasury, status, error } = useTreasury()

const typeOfChildren = (node) => {
  return Array.isArray(node.children) && node.children.length > 0
    ? node.children[0].type
    : 'unknown'
}
</script>
