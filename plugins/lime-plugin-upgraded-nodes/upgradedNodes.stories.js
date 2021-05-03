import { UpgradedNodesPage_ } from './src/upgradedNodesPage';

export default {
    title: 'Containers/Upgraded Nodes'
}

const nodes = [
    { hostname: "ql-czuk", status: "recently_reachable",
      ipv4:'10.5.0.3', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "ql-czuk-bbone", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "si-soniam", status: "recently_reachable",
      ipv4:'10.5.0.16', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.4',
      group: 'upgraded'
    },
    { hostname: "ql-berta", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.4',
      group: 'upgraded'
    },
    { hostname: "ql-nelson", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "ql-irene", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "ql-guillermina", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "ql-silviak", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.3',
      group: 'not_upgraded'
    },
    { hostname: "ql-oncelotes", status: "recently_reachable",
      ipv4:'10.5.0.9', ipv6: 'fd0d:fe46:8ce8::8bbf:7500',
      board: 'LibreRouter v1', fw_version: 'LibreRouterOS 1.2',
      group: 'not_upgraded'
    },
];

export const upgradedNodesPage = () => <UpgradedNodesPage_ nodes={nodes} />
