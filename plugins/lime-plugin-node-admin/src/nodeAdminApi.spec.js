import api from 'utils/uhttpd.service';

jest.mock('utils/uhttpd.service')

import { getWifiData } from './nodeAdminApi';


beforeEach(() => {
    api.call.mockClear();
    api.call.mockImplementation(async () => ({ status: 'ok' }));
})

const defaultOverridesMock = [
    ['community', {ssid: 'quintana-libre.org.ar'}],
    ['default', {ssid: 'LibreMesh.org', enabled: true}]
];

describe('getWifiData', () => {
    it('resolves _cfg_overrides to community defaults, case equal', async () => {
        api.call.mockImplementation(async () => ({
            community_ap: {
                _cfg_overrides: defaultOverridesMock,
                enabled: true,
                ssid: 'quintana-libre.org.ar'
            }
        }));
        let wifiData = await getWifiData();
        expect(wifiData.community_ap.community.enabled).toEqual(true);
        expect(wifiData.community_ap.enabled).toEqual(true);
        expect(wifiData.community_ap.ssid).toEqual('quintana-libre.org.ar');
    });

    it('resolves _cfg_overrides to community defaults, case distinct', async () => {
        api.call.mockImplementation(async () => ({
            community_ap: {
                _cfg_overrides: [
                    ['node', { enabled: false}],
                    ...defaultOverridesMock
                ],
                enabled: false,
                ssid: 'quintana-libre.org.ar'
            }
        }));
        let wifiData = await getWifiData();
        expect(wifiData.community_ap.community.enabled).toEqual(true);
        expect(wifiData.community_ap.enabled).toEqual(false);
        expect(wifiData.community_ap.ssid).toEqual('quintana-libre.org.ar');
    });
});
