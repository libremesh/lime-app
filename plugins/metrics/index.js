import  epics from './metricsEpics';
import { reducer } from './metricsReducer';
import * as selector from './metricsSelectors';
import * as constants from './metricsConstants';
import Metrics from './metricsPage';
import { MetricsMenu } from './metricsMenu';

export default {
  name: 'Metrics',
  page: Metrics,
  menu: MetricsMenu,
  store: {
    name: 'metrics',
    epics,
    reducer,
    selector,
    constants
  }
};