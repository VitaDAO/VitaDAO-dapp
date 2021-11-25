import BaseButton from '../components/BaseButton.vue'

export default {
  component: BaseButton,
  title: 'Components/BaseButton',
  argTypes: {
    type: {
      options: ['default', 'primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    icon: {
      options: ['', 'wallet', 'file', 'home'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
    label: 'Button Label',
    fullWidth: false,
    disabled: false,
    loading: false,
    icon: '',
  },
}

const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args }
  },
  template: '<base-button v-bind="args">{{ args.label }}</base-button>',
})

export const Default = Template.bind({})
Default.args = { type: 'default' }

export const Primary = Template.bind({})
Primary.args = { type: 'primary' }

export const Secondary = Template.bind({})
Secondary.args = { type: 'secondary' }
