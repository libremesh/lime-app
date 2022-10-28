import { h } from "preact";
import { useState } from "preact/hooks";
import Tabs from "components/tabs";
import Loading from "components/loading";
import { List } from "components/list";
import { ExpandableNode } from "plugins/lime-plugin-network-nodes/src/components/expandableNode";
import { useNetworkNodes } from "plugins/lime-plugin-network-nodes/src/networkNodesQueries";
import Help from "components/help";
import { Trans } from '@lingui/macro'; 

const PageHelp = () => (
    <div>
        <p>
            <h5><Trans>Reachable Nodes</Trans></h5>
            <Trans>
                These are the nodes that can be reached from your node,
                i.e. there is a working path from your node to each of them.
            </Trans>
            <br/>
            <Trans>
                This information is synced periodically
                and can be outdated by some minutes.
            </Trans>
        </p>
        <p>
            <h5><Trans>Unreachable Nodes</Trans></h5>
            <Trans>
                These are the nodes that can't be reached from your node,
                it is possible that they are not turned on or a link to reach them is down.
            </Trans>
        </p>
    </div>
);

const PageTabs = ({ nodes, ...props }) => {
    const nReachable = Object.values(nodes).filter(n => n.status === "recently_reachable").length;
    const nUnreachable = Object.values(nodes).filter(n => n.status === "unreachable").length;
    const tabs = [
        { key: 'recently_reachable', repr: <Trans>Reachable ({nReachable}) </Trans>},
        { key: 'unreachable', repr: <Trans>Unreachable ({nUnreachable}) </Trans>},
    ];
    return <Tabs tabs={tabs} {...props} />
}

export const ReachableNodesPage_ = ({ nodes }) => {
    const [ selectedGroup, setselectedGroup ] = useState('recently_reachable');
    const [ unfoldedNode, setunfoldedNode ] = useState(null);
    function changeUnfolded(hostname) {
        if (unfoldedNode == hostname) {
            setunfoldedNode(null);
            return;
        }
        setunfoldedNode(hostname);
    }
    return (
        <div class="d-flex flex-column flex-grow-1 overflow-auto">
            <div class="d-flex">
                <PageTabs nodes={nodes} current={selectedGroup} onChange={setselectedGroup} />
                <div class="container-padded ml-auto">
                    <Help Content={PageHelp} />
                </div>
            </div>
            <List>
                {Object.values(nodes)
                    .filter(n => n.status === selectedGroup)
                    .sort((a, b) => a.hostname > b.hostname)
                    .map(
                        node =>
                            <ExpandableNode key={node.hostname} node={node}
                                showMore={unfoldedNode === node.hostname}
                                onClick={() => changeUnfolded(node.hostname)}/>
                    )}
            </List>
        </div>
    )
}

const ReachableNodesPage = () => {
    const { data: nodes, isLoading } = useNetworkNodes();

    if (isLoading) {
        return <div className="container container-center"><Loading /></div>
    }

    return <ReachableNodesPage_ nodes={nodes} />
}

export default ReachableNodesPage
