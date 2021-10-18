import React from 'react';

import { Tab } from './tab.js';

export default {
  title: 'components/Tab',
  component: Tab,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
};

// eslint-disable-next-line
const Template = (args) => <Tab {...args} />;

export const ActiveTab = Template.bind({});
ActiveTab.args = {
  title: 'Title',
  isActive: false,
  tabIndex: 1,
};

export const InActiveTab = Template.bind({});
InActiveTab.args = {
  title: 'Title',
  isActive: true,
  tabIndex: 1,
};