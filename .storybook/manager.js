import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://codyb.co/icon.svg',
    brandTitle: 'David Glauber Components',
    brandUrl: 'https://codyb.co',
  },
});
