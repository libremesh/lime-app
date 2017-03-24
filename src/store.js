import createStore from './store/createStore'
import makeFetch from './utils/makeFetch'

import { updateLocation } from './store/actions/ActionCreators'
import { getUrl } from './store/selectors/meta'

const store = createStore(window.__STATE__,makeFetch)

//Listen change location on browser
window.addEventListener('popstate', (e) => {
    store.dispatch(updateLocation(window.location.pathname + window.location.search))
})

//Change locatin on state change
store.subscribe(() => {
    const url = getUrl(store.getState())
    if (window.location.pathname + window.location.search !== url) {
        window.history.pushState({}, '', url)
    }
})

// Init location
store.dispatch(updateLocation(window.location.pathname + window.location.search))

export default store;