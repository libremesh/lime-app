import { DeleteNodesPage_ } from './src/deleteNodesPage';

export default {
    title: 'Containers/Remove Nodes'
};

const nodes = [
    { hostname: "ql-refu-bbone", status: "unreachable" },
    { hostname: "si-soniam", status: "unreachable" },
    { hostname: "si-giordano", status: "unreachable" },
    { hostname: "si-mario", status: "unreachable" },
    { hostname: "si-manu", status: "unreachable" },
];

export const deleteNodesPage = (args) => (
    <DeleteNodesPage_ nodes={nodes} {...args} />
);

deleteNodesPage.argTypes = {
    onDelete: { action: 'deleted' }
};