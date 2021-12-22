import { Card } from './card.js';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    id: {
      type: {
        name: 'number',
        required: true,
      },
      defaultValue: 10,
    },
    onEdit: {
      type: 'function',
    },
    onDetail: {
      type: 'function',
    },
    title: {
      type: 'string',
      defaultValue: 'Title',
    },
    date: {
      type: 'string',
      defaultValue: '2021-09-30',
    },
    children: {
      type: 'string',
      defaultValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, sequi.',
    },
    buttonName: {
      type: 'string',
      defaultValue: 'Press me',
      control: {
        type: 'text',
      },
    },
    iconName: {
      type: 'string',
      defaultValue: 'Icon',
    },
    className: {
      type: 'string',
      defaultValue: 'some-class',
    },
  },
};

export { Card };