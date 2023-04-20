import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import {
  StoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AvatarImg from '@/shared/assets/test/avatar.jpg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    firstname: 'Test',
    lastname: 'Test',
    age: 26,
    country: Country.RUSSIA,
    currency: Currency.EUR,
    avatar: AvatarImg,
  },
};
Primary.decorators = [StoreDecorator({})];

export const WithError = Template.bind({});
WithError.args = {
  error: 'true',
};
WithError.decorators = [StoreDecorator({})];

export const WithLoading = Template.bind({});
WithLoading.args = {
  isLoading: true,
};
WithLoading.decorators = [StoreDecorator({})];
