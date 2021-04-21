import { getNodes, markNodesAsGone } from './networkNodesApi'
import api from 'utils/uhttpd.service';
import { of } from 'rxjs';
jest.mock('utils/uhttpd.service')

beforeEach(() => {
    api.call.mockImplementation(() => of({ status: 'ok' }))
})

describe('getNodes', () => {
    it('hits the expected endpoint', async () => {
        getNodes();
        expect(api.call).toBeCalledWith('network-nodes', 'get_nodes', {});
    });

    it('test resolves to nodes data', async () => {
        const nodes = {
            'host1': {
                ipv4: '10.5.0.16',
                ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
                board: 'LibreRouter v1',
                fw_version: 'LibreRouterOS 1.4'
            },
            'host2': {
                ipv4: '10.5.0.17',
                ipv6: 'fd0d:fe46:8ce8::8bbf:75bf',
                board: 'TL-WDR3500',
                fw_version: 'LibreRouterOS 1.4'
            }
        };
        api.call.mockImplementation(() => of({ status: 'ok', nodes }));
        expect(await getNodes()).toEqual(nodes);
    });
});
