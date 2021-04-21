import api from 'utils/uhttpd.service';

export const getNodes = () =>
    api.call('network-nodes', 'get_nodes', {}).toPromise()
        .then(res => res.nodes);

export const markNodesAsGone = () => api.call('network-nodes', 'mark_nodes_as_gone', {}).toPromise();
