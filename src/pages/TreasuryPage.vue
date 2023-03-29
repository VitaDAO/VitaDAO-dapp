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
      <div class="grid grid-cols-1 gap-6">
        <div class="flex flex-col gap-3">
          <p>
            The data provided on this page is either updated manually or gathered from third party
            APIs and is offered for informational pusposes only. We strive to make this data as
            accurate as possible but some of it could be missing or out of date. If you think you
            found a mistake, let us know on our
            <a href="https://discord.com/invite/3S3ftnmZYD" class="underline">Discord</a>.
          </p>
        </div>
        <div
          v-for="section in treasury.sections"
          class="border border-gray-300 p-3 sm:p-6 rounded-2xl flex flex-col gap-3"
          :key="section.title"
        >
          <h3 class="text-base sm:text-lg md:text-xl flex items-center gap-3 justify-between">
            <span>{{ `${section.title} · $${format(section.value)}` }}</span>
            <span class="text-xs sm:text-sm bg-gray-200 rounded-full px-2 py-1 leading-none">
              {{ `${format(section.percent)}%` }}
            </span>
          </h3>
          <table
            v-for="table in section.tables"
            :key="table.headings.asset"
            class="text-xs sm:text-sm lg:text-base w-full"
          >
            <colgroup>
              <col />
              <template v-if="isOverSmBreakpoint">
                <col
                  v-if="table.headings.price"
                  class="w-[80px] sm:w-[95px] md:w-[110px] lg:w-[170px]"
                />
                <col
                  v-if="table.headings.balance"
                  class="w-[80px] sm:w-[95px] md:w-[110px] lg:w-[170px]"
                />
              </template>
              <col class="w-[80px] sm:w-[95px] md:w-[110px] lg:w-[170px]" />
            </colgroup>
            <thead class="text-left text-uppercase">
              <tr>
                <th class="p-2">
                  {{ table.headings.asset }}
                </th>
                <template v-if="isOverSmBreakpoint">
                  <th v-if="table.headings.price" class="p-2 text-right">
                    {{ table.headings.price }}
                  </th>
                  <th v-if="table.headings.balance" class="p-2 text-right">
                    {{ table.headings.balance }}
                  </th>
                </template>
                <th class="p-2 text-right">
                  {{ table.headings.value }}
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
                <template v-if="isOverSmBreakpoint">
                  <td v-if="row.price" class="px-2 py-3 text-right">
                    {{ '$' + format(row.price) }}
                  </td>
                  <td v-if="row.balance != null" class="px-2 py-3 text-right">
                    {{ format(row.balance) }}
                  </td>
                </template>
                <td class="px-2 py-3 text-right">
                  {{ '$' + format(row.value.value, 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import ErrorIndicator from '@/components/ErrorIndicator'
import LoadingIndicator from '@/components/LoadingIndicator'
import MediaElement from '@/components/MediaElement'
import { useTreasury } from '@/utils/queries'
import { useMediaQuery } from '@vueuse/core'

const { data: treasury, status, error } = useTreasury()

const isOverSmBreakpoint = useMediaQuery('(min-width: 640px)')

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
</script>
