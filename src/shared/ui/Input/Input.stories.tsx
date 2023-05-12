import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Placeholder text',
  value: 'Input text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  placeholder: 'Placeholder text',
  value: 'Input text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
