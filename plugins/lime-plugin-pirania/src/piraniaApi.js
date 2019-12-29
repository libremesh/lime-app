import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

export const getGovernance = (api, sid) => api.call(sid, 'pirania-app', 'show_governance', {});
