import {
  IFACE_CHANGE,
  STATION_SET,
  IFACES_LOAD,
  TIMER_STOP
} from './alignConstants';

export const changeInterface = (iface) => (dispatch, getState) => {
  if (iface === getState().align.currentReading.iface) {
    return;
  }
  dispatch({
    type: IFACE_CHANGE,
    payload: {
      iface
    }
  });
};

export const changeStation = (mac) => (dispatch, getState) => {
  if (mac === getState().align.currentReading.mac) {
    return;
  }
  dispatch({
    type: STATION_SET,
    payload: getState().align.stations.filter(x => x.mac === mac)[0]
  });
};

export const startAlign = () => (dispatch) => {
  dispatch({
    type:IFACES_LOAD
  });
};

export const stopTimer = () => (dispatch) => {
  dispatch({
    type:TIMER_STOP
  });
};