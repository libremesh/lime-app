import { configure } from '@storybook/preact';

configure([
    require.context('../stories', true, /\.stories\.js$/),
    require.context('../plugins', true, /\.stories\.js$/)
], module);
