import { of, throwError } from 'rxjs';
import api from 'utils/uhttpd.service';
import waitForExpect from 'wait-for-expect';

jest.mock('utils/uhttpd.service')

import { getNodes, markNodesAsGone } from './networkNodesApi';


beforeEach(() => {
    api.call.mockClear();
})

describe('getNodes', () => {
    it('calls the expected endpoint', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }))
        await getNodes();
        expect(api.call).toBeCalledWith('network-nodes', 'get_nodes', {});
    })

    it('resolves to network nodes', async () => {
        const networkNodes = [
            { hostname: 'node1', status: 'connected' },
            { hostname: 'node2', status: 'disconnected' },
            { hostname: 'node3', status: 'gone' },
        ];
        api.call.mockImplementation(() => of(
            {
                status: 'ok',
                nodes: networkNodes,
            }));
        let nodes = await getNodes();
        expect(nodes).toEqual(networkNodes);
    });
});

describe('markNodesAsGone', () => {
    it('calls the expected endpoint', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }))
        await markNodesAsGone(['node1']);
        expect(api.call).toBeCalledWith('network-nodes', 'mark_nodes_as_gone', { hostnames: ['node1'] })
    })

    it('resolve to hostnames passed as parameters on success', async() => {
        api.call.mockImplementation(() => of({status: 'ok'}))
        const result = await markNodesAsGone(['node1', 'node2'])
        expect(result).toEqual(['node1', 'node2'])
    })
});
