import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  ThemeDecorator,
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import {
  StoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => (
  <AboutPage />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({}),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
