import {
	INIT_NET_ADMIN,
	INIT_NET_ADMIN_API
} from './netAdminConstants';

import { ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';

const initNetAdmin = (action$, store, { wsAPI }) => action$.pipe(
	ofType(INIT_NET_ADMIN),
	mapTo({ type: INIT_NET_ADMIN_API, payload: { api: wsAPI } })
);


export default {
	initNetAdmin,
};
