import { ExpandableNode } from './index';

export default {
	title: 'Containers/NetworkNodes/Components/ExpandableNode',
	component: ExpandableNode
};

const node = {
    hostname: 'ql-flor',
    ipv4:'10.5.0.16',
    ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
    board: 'LibreRouter v1',
    fw_version: 'LibreRouterOS 1.4'
};

export const folded = () =>
    <ExpandableNode node={node} showMore={false}/>

export const unfolded = () =>
    <ExpandableNode node={node} showMore={true}/>