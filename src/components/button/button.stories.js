import { Button } from './button.js';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    type: {
      options: ['button'],
      control: { type: 'radio' },
      defaultValue: 'button',
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      defaultValue: false,
    },
    children: {
      type: {
        required: true,
      },
      control: { type: 'text' },
      defaultValue: 'Submit',
    },
  },
};

export { Button };
