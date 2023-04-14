module.exports = {
  stories: [
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules',
    'storybook-addon-mock/register',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
