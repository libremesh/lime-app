import { useQuery } from 'react-query';
import { getNodes } from './networkNodesApi';

export const useNetworkNodes = () => 
    useQuery(['network-nodes', 'get_nodes'], getNodes);
