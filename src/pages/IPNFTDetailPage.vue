<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-white text-xl">{{ result.ipnft.name }}</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const result = {
      ipnft: {
        name: 'The Longevity Molecule (IPNFT)',
        description:
          'The Scheibye-Knudsen lab has analyzed 1.5 billion prescriptions from 4.8 million individuals over 40 years in The Danish National Health Service Prescription Database and correlated this with the survival of individuals prescribed certain drugs. The Scheibye-Knudsen Lab has identified several FDA-approved medications that appear to have a strong effect on lifespan following analysis. This project focuses on testing and developing three of these small molecules as possible interventions in aging, with the first series of experiments testing these therapies in fruit flies and human cells. This is an exclusive license agreement for the IP resulting from these experiments.',
        external_url: 'https://dao.vitadao.com/#/proposals/funding/3',
        image: 'https://arweave.net/gQm_NpkJIjEFD6sOVHLEJ-tZIKhRvgmYEl5es0g-YdQ',
        properties: {
          nvm_metadata: 'https://arweave.net:443/qGsHltU0PTfGTSNfYipLWnFwTi6g8Q-JRzJzhFDOio4',
          agreement_type: 'License Agreement',
          industry: 'Pharmaceutical R&D',
          research_lead: 'The Scheibye-Knudsen Lab',
        },
      },
    }

    return {
      result,
    }
  },
})
</script>
