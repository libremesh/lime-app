import Meta   from '@libremesh/limeapp-plugin-core';
import Align  from '@libremesh/limeapp-plugin-align';
import Locate from '../plugins/locate';
import Metrics from '../plugins/metrics';
import Tasks from '../plugins/tasks';
import Rx from '@libremesh/limeapp-plugin-rx';

// REGISTER PLUGINS
export const plugins = [
  Rx,
  Meta,
  Align,
  Locate,
  Metrics,
  Tasks
];