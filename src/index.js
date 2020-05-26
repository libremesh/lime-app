import './style';
import 'skeleton-less/less/skeleton';
import { AppDefault } from './components/app';
import './i18nline-glue';
import { initStore } from './store';

initStore();

export default AppDefault;
