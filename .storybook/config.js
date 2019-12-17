import { configure } from '@storybook/preact';

configure(require.context('../stories', true, /\.stories\.js$/), module);