import { 
  UPDATE_LOCATION,
  CONECTION_SUCCESS,
  CONECTION_START,
  CONECTION_CHANGE_URL,
  AUTH_LOGIN_SUCCESS
} from './../actions/ActionTypes'

export const initialState = {
  title: 'LimeApp',
  sid: 'no_user',
  url: '/',
  conection: false,
  ws: '',
  interval: 1500
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, payload)
    case CONECTION_START:
      return Object.assign({}, state, {conection: false, ws: payload, sid: 'no_user' })
    case CONECTION_CHANGE_URL:
      return Object.assign({}, state, {conection: false, ws: payload, sid: 'no_user'})
    case CONECTION_SUCCESS:
      return Object.assign({}, state, payload)
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {sid:payload})
    default:
      return state
  }
}
