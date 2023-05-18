import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCardRedesigned } from './ProfileCardRedesigned';

export default {
  title: 'shared/ProfileCardRedesigned',
  component: ProfileCardRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
  <ProfileCardRedesigned {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
