import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

export const getActiveVouchers = (api, sid) => api.call(sid, 'pirania', 'show_active_vouchers', {});
export const getStatus = (api, sid) => api.call(sid, 'pirania', 'status', {});
export const getGovernance = (api, sid) => api.call(sid, 'pirania-app', 'read_governance', {});
export const getVoucherList = (api, sid) => api.call(sid, 'pirania', 'list_vouchers', {});
export const runEnable = (api, sid) => api.call(sid, 'pirania', 'enable', {});
export const runDisable = (api, sid) => api.call(sid, 'pirania', 'disable', {});
export const addMemberVoucher = (api, sid, input) => api.call(sid, 'pirania', 'add_member_voucher', input);
export const addVisitorVoucher = (api, sid, input) => api.call(sid, 'pirania', 'add_visitor_voucher', input);
export const runRenewVouchers = (api, sid, input) => api.call(sid, 'pirania', 'renew_many_vouchers', input);
export const runWriteGovernance = (api, sid, input) => api.call(sid, 'pirania-app', 'write_governance', input);
