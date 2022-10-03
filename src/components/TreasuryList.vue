<template>
  <div class="rounded-2xl border border-gray-300 p-6">
    <h3 class="text-lg mb-5">All investments</h3>
    <ul class="space-y-5 text-[17px]">
      <li v-for="token in tokens" :key="token.name">
        <div class="flex items-center gap-3">
          <div class="rounded-full h-[40px] w-[40px] bg-gray-300" />
          <div class="flex-grow">
            <div class="flex gap-2 font-medium items-center">
              <span>{{ token.name }}</span>
              <span class="text-[15px] px-1 rounded-lg bg-gray-200 leading-5">{{
                token.percent
              }}</span>
              <span class="flex-grow text-right">{{ token.value }}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-gray-500">{{ token.treasury }}</span>
              <span
                class="flex-grow text-right"
                :class="[token.stats[0] === '+' ? 'text-green-500' : 'text-red-500']"
                >{{ token.stats }}</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tokens: [
        {
          name: 'VitaDAO Token',
          percent: '52.88%',
          value: '$13,524,470',
          treasury: '7,757,325.735 VITA • $2.00',
          stats: '+4.32% ($559,782.25)',
        },
        {
          name: 'Wrapped Ether',
          percent: '34.94%',
          value: '$8,945,746',
          treasury: '1,900.756 WETH • $4,701.98',
          stats: '-1.05% ($95,102.25)',
        },
        {
          name: 'Balancer 50 VITA 50 WETH',
          percent: '52.88%',
          value: '$13,524,470',
          treasury: '7,757,325.735 B50VITA-50WETH • $98.36',
          stats: '+4.32% ($559,782.25)',
        },
        {
          name: 'VitaDAO Balancer Pool',
          percent: '52.88%',
          value: '$13,524,470',
          treasury: '7,757,325.735 VITA • $2.00',
          stats: '+4.32% ($559,782.25)',
        },
        {
          name: 'USD Coin',
          percent: '52.88%',
          value: '$13,524,470',
          treasury: '7,757,325.735 VITA • $2.00',
          stats: '+4.32% ($559,782.25)',
        },
      ],
    }
  },
}
</script>
