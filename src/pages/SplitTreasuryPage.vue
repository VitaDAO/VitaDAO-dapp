<template>
  <div class="w-full">
    <hr class="border-black mb-6 sm:mb-4" />
    <div class="grid grid-cols-1 gap-6">
      <template v-for="section in tidyTreasury.children" :key="section.title">
        <h2 class="font-medium mt-1.5 sm:mt-4 text-black text-xl sm:text-2xl md:text-3xl">
          {{ `${section.title} · $${format(section.value)}` }}
        </h2>
        <div
          v-for="subsection in section.children"
          class="border border-gray-300 p-3 sm:p-6 rounded-2xl flex flex-col gap-3"
          :key="subsection.title"
        >
          <h3 class="text-base sm:text-lg md:text-xl flex items-center gap-3 justify-between">
            <span>{{ `${subsection.title} · $${format(subsection.value)}` }}</span>
            <span class="text-xs sm:text-sm bg-gray-200 rounded-full px-2 py-1 leading-none">
              {{ `${format(subsection.percent)}%` }}
            </span>
          </h3>
          <template v-if="Array.isArray(subsection.children[0].children)">
            <table v-for="group in subsection.children" :key="group.title">
              <thead>
                <th class="p-2 text-left">{{ group.title }}</th>
                <th class="p-2 text-right">Value</th>
              </thead>
              <tbody>
                <tr v-for="row in group.children" :key="row.asset.name" class="border-t">
                  <td class="px-2 py-3 flex gap-3 items-center">
                    <MediaElement
                      v-if="row.asset.iconUrl"
                      :src="row.asset.iconUrl"
                      alt=""
                      class="h-5 w-5 sm:h-9 sm:w-9 object-cover"
                    />
                    <div
                      v-else
                      class="h-5 w-5 sm:h-9 sm:w-9 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center"
                    >
                      {{ initials(row.asset.name) }}
                    </div>
                    <div>
                      <div class="font-bold">{{ row.asset.name }}</div>
                      <div v-if="row.asset.chain || row.asset.position_type">
                        {{
                          [row.asset.chain, row.asset.position_type]
                            .filter(Boolean)
                            .map(capitalize)
                            .join(' · ')
                        }}
                      </div>
                    </div>
                  </td>
                  <td class="px-2 py-3 text-right">{{ `$${format(row.value)}` }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <table class="text-xs sm:text-sm lg:text-base w-full">
              <thead>
                <th class="p-2 text-left">Asset</th>
                <th class="p-2 text-right">Value</th>
              </thead>
              <tbody>
                <tr v-for="row in subsection.children" :key="row.asset.name" class="border-t">
                  <td class="px-2 py-3 flex gap-3 items-center">
                    <MediaElement
                      v-if="row.asset.iconUrl"
                      :src="row.asset.iconUrl"
                      alt=""
                      class="h-5 w-5 sm:h-9 sm:w-9 object-cover"
                    />
                    <div
                      v-else
                      class="h-5 w-5 sm:h-9 sm:w-9 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center"
                    >
                      {{ initials(row.asset.name) }}
                    </div>
                    <div>
                      <div class="font-bold">{{ row.asset.name }}</div>
                      <div v-if="row.asset.chain || row.asset.position_type">
                        {{
                          [row.asset.chain, row.asset.position_type]
                            .filter(Boolean)
                            .map(capitalize)
                            .join(' · ')
                        }}
                      </div>
                    </div>
                  </td>
                  <td class="px-2 py-3 text-right">{{ `$${format(row.value)}` }}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import treasury from '@/assets/treasury.json'
import MediaElement from '@/components/MediaElement'

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

function initials(name) {
  return name
    .split(/\s|\./)
    .slice(0, 3)
    .map((term) => term[0])
    .join('')
    .toUpperCase()
}

function capitalize(label) {
  return label && label.length > 0 ? label[0].toUpperCase() + label.slice(1) : ''
}

// Tidy up means recompute aggregated node values and sort children in order of
// descending value
function tidyNode(node, parentValue) {
  const value = nodeValue(node)
  return {
    ...node,
    value,
    percent: parentValue ? (value * 100) / parentValue : 100,
    children: node.children?.map((cur) => tidyNode(cur, value)).sort((a, b) => b.value - a.value),
  }
}

function nodeValue(node) {
  if (Array.isArray(node.children) && node.children.length > 0) {
    return node.children.reduce((acc, cur) => acc + nodeValue(cur), 0)
  } else {
    return node.value
  }
}

const tidyTreasury = tidyNode(treasury)
</script>
