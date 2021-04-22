import api from 'utils/uhttpd.service';

export const getNodes = () =>
    api.call('network-nodes', 'get_nodes', {}).toPromise()
        .then(res => {
            return res.nodes;
        });

export const markNodesAsGone = (hostnames) =>
    api.call('network-nodes', 'mark_nodes_as_gone', { hostnames: hostnames }).toPromise()
        .then(() => hostnames);