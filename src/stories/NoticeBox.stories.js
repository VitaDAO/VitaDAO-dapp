import NoticeBox from '../components/NoticeBox.vue'

export default {
  component: NoticeBox,
  title: 'Components/Noticebox',
  argTypes: {
    type: {
      options: ['warning', 'danger'],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'warning',
    content: 'I am a notice box.',
  },
}

const Template = (args) => ({
  components: { NoticeBox },
  setup() {
    return { args }
  },
  template: `
  <notice-box v-bind="args">
    <p>
      {{ args.content }}
    </p>
  </notice-box
  >`,
})

export const Warning = Template.bind({})

export const Danger = Template.bind({})
Danger.args = { type: 'danger' }
