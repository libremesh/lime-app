import { configure } from '@storybook/preact';
import '../src/i18nline-glue';
import '../src/style';

configure([
    require.context('../stories', true, /\.stories\.js$/),
    require.context('../plugins', true, /\.stories\.js$/)
], module);
