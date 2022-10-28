import { h, Fragment } from "preact";
import style from "./style.less";
import { useEffect, useState } from "preact/hooks";
import Tabs from "components/tabs";
import Loading from "components/loading";
import { List } from "components/list";
import { ExpandableNode } from "plugins/lime-plugin-network-nodes/src/components/expandableNode";
import { useNetworkNodes } from "plugins/lime-plugin-network-nodes/src/networkNodesQueries";
import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import Help from "components/help";
import { Trans } from '@lingui/macro'; 

function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
};

const PageHelp = () => (
    <div>
        <p>
            <h5><Trans>Upgraded Nodes</Trans></h5>
            <Trans>These are the nodes running the last version of the Firmware</Trans>
        </p>
        <p>
            <h5><Trans>Not Upgraded Nodes</Trans></h5>
            <Trans>These are the nodes that need to be upgraded to the last version of the Firmware</Trans>
        </p>
    </div>
);

const PageTabs = ({ nodes, ...props }) => {
    const nUpgraded = nodes.filter(n => n.group === "upgraded").length;
    const nNotUpgraded = nodes.filter(n => n.group === "not_upgraded").length;
    const tabs = [
        { key: 'upgraded', repr: <Trans>Upgraded ({nUpgraded})</Trans>},
        { key: 'not_upgraded', repr: <Trans>Not Upgraded ({nNotUpgraded})</Trans>},
    ];
    return <Tabs tabs={tabs} {...props} />
}

export const UpgradedNodesPage_ = ({ nodes }) => {
    const [selectedGroup, setselectedGroup] = useState('upgraded');
    const [unfoldedNode, setunfoldedNode] = useState(null);

    function changeUnfolded(hostname) {
        if (unfoldedNode == hostname) {
            setunfoldedNode(null);
            return;
        }
        setunfoldedNode(hostname);
    }

    const groupNodes = nodes
        .filter(n => n.status !== 'gone')
        .filter(n => n.group === selectedGroup);

    const grouppedByVersion = groupBy(groupNodes, 'fw_version')
        .sort((a, b) => a.key > b.key);

    return (
        <div class="d-flex flex-column flex-grow-1 overflow-auto">
            <div class="d-flex">
                <PageTabs nodes={nodes} current={selectedGroup} onChange={setselectedGroup} />
                <div class="container-padded ml-auto">
                    <Help Content={PageHelp} />
                </div>
            </div>
            <List>
                {grouppedByVersion
                    .map((versionGroup, index) => (
                        <Fragment>
                            {selectedGroup === 'not_upgraded' &&
                                <div class={style.stickySubheader} style={{ zIndex: 990 + index }}>
                                    {versionGroup.key}
                                </div>
                            }
                            {versionGroup.values
                                .map(node =>
                                    <ExpandableNode key={node.hostname} node={node}
                                        showMore={unfoldedNode === node.hostname}
                                        onClick={() => changeUnfolded(node.hostname)} />
                                )}
                        </Fragment>
                    ))
                }
            </List>
        </div>
    )
}

const UpgradedNodesPage = () => {
    const { data: nodes, isLoading: isLoadingNodes } = useNetworkNodes();
    const { data: newVersion, isLoading: isLoadingVersion } = useNewVersion();
    const [taggedNodes, setTaggedNodes] = useState(undefined);

    useEffect(() => {
        if (nodes && newVersion) {
            const taggedNodes = [...Object.values(nodes)].map(
                n => ({
                    ...n,
                    group: n.fw_version === newVersion.version ? 'upgraded' : 'not_upgraded'
                }));
            setTaggedNodes(taggedNodes);
        }
    }, [nodes, newVersion])

    if (isLoadingNodes || isLoadingVersion || taggedNodes === undefined) {
        return <div className="container container-center"><Loading /></div>
    }

    return <UpgradedNodesPage_ nodes={taggedNodes} />
}

export default UpgradedNodesPage
