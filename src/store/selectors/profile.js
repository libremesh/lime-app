import { getUrl } from './meta'

export const getProfile = (state) => {
    const url = getUrl(state)
    return url.indexOf('/profile/') > -1 ? url.split('/profile/')[1] : null
}