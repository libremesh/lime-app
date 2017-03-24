import {
  LOCATION_LOAD,
  LOCATION_CHANGE,
  UPDATE_LOCATION,
  IFACE_CHANGE,
  STATION_SET
} from './ActionTypes'

import { getUrl } from './../selectors/meta'

const startAction = (type) => ({ type })
const successAction = (type, json) => ({ type, payload: json })
const errorAction = (type, error) => ({ type, payload: error, error: true })

export const updateLocation = (newUrl) => (dispatch, getState) => {
  if (newUrl === getUrl(getState())) {
    return
  }
  dispatch({
    type: UPDATE_LOCATION,
    payload: {
      url: newUrl
    }
  })
}

export const changeInterface = (iface) => (dispatch, getState) => {
  if (iface === getState().align.currentReading.iface) {
    return
  }
  dispatch({
    type: IFACE_CHANGE,
    payload: {
      iface
    }
  })
}

export const changeStation = (mac) => (dispatch, getState) => {
  if (mac === getState().align.currentReading.mac) {
    return
  }
  dispatch({
    type: STATION_SET,
    payload: getState().align.stations.filter(x => x.mac === mac)[0]
  })
}

export const loadLocation = ( ) => (dispatch, getState) => {
  dispatch({
    type: LOCATION_LOAD
  })
}

export const changeLocation = ( location ) => (dispatch, getState) => {
  dispatch({
    type: LOCATION_CHANGE,
    payload: location
  })
}