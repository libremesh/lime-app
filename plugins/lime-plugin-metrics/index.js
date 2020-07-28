import  epics from './src/metricsEpics';
import { reducer } from './src/metricsReducer';
import * as constants from './src/metricsConstants';
import Metrics from './src/metricsPage';
import { MetricsMenu } from './src/metricsMenu';

export default {
	name: 'Metrics',
	page: Metrics,
	menu: MetricsMenu,
	store: {
		name: 'metrics',
		epics,
		reducer,
		constants
	}
};
