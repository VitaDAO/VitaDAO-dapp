<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2
      v-if="status === 'success'"
      class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl"
    >
      {{ `Treasury · $${format(portfolio.value)}` }}
    </h2>
    <h2 v-else class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Treasury</h2>
    <div class="grid grid-cols-1 gap-6">
      <template v-if="status === 'success'">
        <div
          v-for="section in portfolio.sections"
          class="border border-gray-300 p-6 rounded-2xl flex flex-col gap-3"
          :key="section.title"
        >
          <h3 class="text-xl flex items-center gap-3">
            <span>{{ `${section.title} · $${format(section.value)}` }}</span>
            <span class="text-sm bg-gray-300 rounded-full px-2 py-1 leading-none">{{
              `${format(section.percent)}%`
            }}</span>
          </h3>
          <table
            v-for="table in section.tables"
            :key="table.headings.asset"
            class="text-xs sm:text-sm lg:text-base w-full"
          >
            <thead class="text-left text-uppercase">
              <tr>
                <th v-for="heading in Object.values(table.headings)" :key="heading" class="p-2">
                  {{ heading }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in table.rows.filter((row) => row.value.value > 1)"
                :key="row.asset.name"
                class="border-t"
              >
                <td class="flex gap-3 items-center px-2 py-3">
                  <img
                    v-if="row.asset.iconUrl"
                    :src="row.asset.iconUrl"
                    alt=""
                    class="h-5 w-5 sm:h-9 sm:w-9"
                  />
                  <div
                    v-else
                    class="h-5 w-5 sm:h-9 sm:w-9 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center"
                  >
                    {{ initials(row.asset.name) }}
                  </div>
                  <div>
                    <div class="font-bold">{{ row.asset.name }}</div>
                    <div v-if="row.asset.position_type">
                      {{
                        `${capitalize(row.asset.chain)} · ${capitalize(row.asset.position_type)}`
                      }}
                    </div>
                    <div v-else>
                      {{ capitalize(row.asset.chain) }}
                    </div>
                  </div>
                </td>
                <td v-if="row.price" class="px-2 py-3">{{ '$' + format(row.price) }}</td>
                <td class="px-2 py-3">{{ format(row.balance) }}</td>
                <td class="px-2 py-3">
                  <div>{{ '$' + format(row.value.value, 0) }}</div>
                  <template v-if="row.value.absolute_1d && row.value.percent_1d">
                    <div v-if="row.value.absolute_1d > 0" class="text-green-500">
                      {{
                        `+${format(row.value.percent_1d)}% ($${format(
                          Math.abs(row.value.absolute_1d),
                        )})`
                      }}
                    </div>
                    <div v-else class="text-red-500">
                      {{
                        `${format(row.value.percent_1d)}% ($${format(
                          Math.abs(row.value.absolute_1d),
                        )})`
                      }}
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <div class="border border-gray-300 p-6 rounded-2xl">
        <h3 class="text-xl pb-3 border-b border-gray-300 mb-5">IP-NFTs</h3>
        <NftList :nfts="vitadaoEthNfts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NftList from '@/components/NftList.vue'
import { useNfts, usePortfolio } from '@/utils/queries'

const { data: portfolio, status } = usePortfolio()

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

const capitalize = (label) => {
  return label && label.length > 0 ? label[0].toUpperCase() + label.slice(1) : ''
}

const { data: vitadaoEthNfts } = useNfts({
  owner: '0xf5307a74d1550739ef81c6488dc5c7a6a53e5ac2',
  contract: '0x42D2354EF0b54279516f5799791086F2f499086E',
})
</script>
