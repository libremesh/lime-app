import { useQuery, useMutation } from 'react-query';
import { getNodes, markNodesAsGone } from './networkNodesApi';
import queryCache from 'utils/queryCache';

export const useNetworkNodes = () => useQuery(['network-nodes', 'get_nodes'], getNodes)

export const useMarkNodesAsGone = () => useMutation(markNodesAsGone, {
    onSuccess: hostnames => queryCache.setQueryData(['network-nodes', 'get_nodes'],
        old => {
            const result = old.map(
                node => hostnames.indexOf(node.hostname) != -1 ? { ...node, status: "gone" } : node
            )
            return result;
        }
    )
})