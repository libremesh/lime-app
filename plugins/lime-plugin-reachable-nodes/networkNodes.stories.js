import { NetworkNodesPage_ } from "./src/networkNodesPage";
import { DeleteNodesPage_ } from "./src/containers/deleteNodesPage";

export default {
    title: 'Containers/Network nodes',
};

const nodes = [
    { hostname: "ql-czuk", status: "connected" },
    { hostname: "ql-irene", status: "connected" },
    { hostname: "ql-ipem", status: "connected" },
    { hostname: "ql-czuck-bbone", status: "connected" },
    { hostname: "ql-graciela", status: "connected" },
    { hostname: "ql-marisa", status: "connected" },
    { hostname: "ql-anaymarcos", status: "connected" },
    { hostname: "ql-quinteros", status: "connected" },
    { hostname: "ql-guada", status: "connected" },
    { hostname: "ql-refu-bbone", status: "disconnected" },
    { hostname: "si-soniam", status: "disconnected" },
    { hostname: "si-giordano", status: "disconnected" },
    { hostname: "si-mario", status: "disconnected" },
    { hostname: "si-manu", status: "disconnected" },
];

export const networkNodesPage = () => (
    <NetworkNodesPage_ nodes={nodes} />
)

export const deleteNodesPage = (args) => (
    <DeleteNodesPage_ nodes={nodes} {...args} />
)
deleteNodesPage.argTypes = {
    onDelete: { action: 'deleted' }
}