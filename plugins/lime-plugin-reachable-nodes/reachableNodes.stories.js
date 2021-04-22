import { ReachableNodesPage_ } from "./src/reachableNodesPage";

export default {
    title: 'Containers/ReachableNodes',
};

const nodes = [
    { hostname: "ql-czuk", status: "recently_reachable",
      ipv4:'10.5.0.3', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.4'
    },
    { hostname: "ql-irene", status: "recently_reachable" },
    { hostname: "ql-ipem", status: "recently_reachable" },
    { hostname: "ql-czuck-bbone", status: "recently_reachable" },
    { hostname: "ql-graciela", status: "recently_reachable" },
    { hostname: "ql-marisa", status: "recently_reachable" },
    { hostname: "ql-anaymarcos", status: "recently_reachable" },
    { hostname: "ql-quinteros", status: "recently_reachable" },
    { hostname: "ql-guada", status: "recently_reachable" },
    { hostname: "ql-refu-bbone", status: "unreachable" },
    { hostname: "si-soniam", status: "unreachable" },
    { hostname: "si-giordano", status: "unreachable" },
    { hostname: "si-mario", status: "unreachable" },
    { hostname: "si-manu", status: "unreachable" },
];

export const reachableNodesPage = () => (
    <ReachableNodesPage_ nodes={nodes} />
);
