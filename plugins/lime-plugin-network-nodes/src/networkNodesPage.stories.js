import NetworkNodes, {_NetworkNodes} from './networkNodesPage';

export default {
    title: 'Containers/networkNodes'
}

const nodes = [
    {
        hostname: 'ql-berta',
        ipv4:'10.5.0.16',
        ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
        board: 'LibreRouter v1',
        fw_version: 'LibreRouterOS 1.4'
    },
    {
        hostname: 'ql-nelson',
        ipv4:'10.5.0.17',
        ipv6: 'fd0d:fe46:8ce8::8bbf:75bf',
        board: 'LibreRouter v1',
        fw_version: 'LibreRouterOS 1.4'
    }
];

export const networkNodesNonUnfolded = () => 
    <_NetworkNodes nodes={nodes} />

export const networkNodesOneUnfolded = () => 
    <_NetworkNodes nodes={nodes} unfoldedNode={'ql-berta'} />

export const networkNodesLoading = () => 
    <_NetworkNodes isLoading={true} />

const manyNodes = [];
for (let i = 0; i < 15; i++) {
    const hostname = `host${i}`;
    const node = {...nodes[0]};
    node.hostname = hostname;
    manyNodes.push(node);
}

export const networkNodesManyNodes = () =>
    <_NetworkNodes nodes={manyNodes} />

export const networkNodesInteractive = () =>
    <NetworkNodes />
networkNodesInteractive.args = {
    queries: [
        [['network-nodes', 'get_nodes'],
            Object.fromEntries(nodes.map(n => [n.hostname, n]))]
    ]
}