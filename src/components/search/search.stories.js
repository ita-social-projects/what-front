import { Search } from './search.js';

export default {
  title: 'components/Search',
  component: Search,
  argTypes: {
    onSearch: {
      type: {
        name: 'function',
      },
    },
    placeholder: {
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: 'placeholder',
    },
    className: {
      type: {
        name: 'string',
      },
      defaultValue: 'some-name',
    },

  },
};

export { Search };