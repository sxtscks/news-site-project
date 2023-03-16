import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  ThemeDecorator,
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title text',
  text: 'Normal text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title text',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Normal text',
};

export const ErrorText = Template.bind({});
ErrorText.args = {
  title: 'Title text',
  text: 'Normal text',
  theme: TextTheme.ERROR,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title text',
  text: 'Normal text',
  size: TextSize.L,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title text',
  text: 'Normal text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
