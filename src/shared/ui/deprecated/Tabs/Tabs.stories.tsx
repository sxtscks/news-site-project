import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      value: '1',
      content: 'tab1',
    },
    {
      value: '2',
      content: 'tab2',
    },
    {
      value: '3',
      content: 'tab3',
    },
  ],
  value: '2',
  onTabClick: action('onTabClick'),
};
