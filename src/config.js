import Meta   from '@libremesh/limeapp-plugin-core';
import Align  from '@libremesh/limeapp-plugin-align';
//import Locate from '../plugins/locate';
import Locate from '@libremesh/limeapp-plugin-locate';
import Metrics from '@libremesh/limeapp-plugin-metrics';
import Notes from '@libremesh/limeapp-plugin-notes';
import Rx from '@libremesh/limeapp-plugin-rx';

// REGISTER PLUGINS
export const plugins = [
  Rx,
  Meta,
  Align,
  Locate,
  Metrics,
  Notes
];