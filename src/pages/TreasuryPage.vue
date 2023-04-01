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
        {{ `Treasury · $${format(treasury.value)}` }}
      </h2>
      <div class="grid grid-cols-1 gap-3 sm:gap-6">
        <div class="flex flex-col gap-3">
          <p class="text-xs sm:text-base">
            The data provided on this page is either updated manually or gathered from third party
            APIs and is offered for informational pusposes only. We strive to make this data as
            accurate as possible but some of it could be missing or out of date. If you think you
            found a mistake, let us know on our
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
            <span>{{ `${section.label} · $${format(section.value)}` }}</span>
            <span class="text-xs sm:text-sm bg-gray-200 rounded-full px-2 py-1 leading-none">
              {{ `${format(section.percent)}%` }}
            </span>
          </h3>
          <p v-if="section.comment" class="text-xs sm:text-base">{{ section.comment }}</p>
          <!-- Section has subsections -->
          <template v-if="typeOfChildren(section) === 'group'">
            <div v-for="subsection of section.children" :key="subsection.label">
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
import { useTreasury } from '@/utils/queries'

const { data: treasury, status, error } = useTreasury()

function format(n, decimals) {
  if (decimals) {
    return n?.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  if (n >= 1000) {
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  } else {
    return n?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}

const typeOfChildren = (node) => {
  return Array.isArray(node.children) && node.children.length > 0
    ? node.children[0].type
    : 'unknown'
}
</script>
