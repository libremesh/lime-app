import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Tabs from "components/tabs";
import Loading from "components/loading";
import { List } from "components/list";
import { ExpandableNode } from "plugins/lime-plugin-network-nodes/src/components/expandableNode";
import { useNetworkNodes } from "plugins/lime-plugin-network-nodes/src/networkNodesQueries";
import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import Help from "components/help";
import I18n from 'i18n-js';

const PageHelp = () => (
    <div>
        <p>
            <h5>{I18n.t("Upgraded Nodes")}</h5>
            {I18n.t("These are the nodes running the last version of the Firmware")}
        </p>
        <p>
            <h5>{I18n.t("Not Upgraded Nodes")}</h5>
            {I18n.t("These are the nodes that need to be upgraded to the last version of the Firmware")}
        </p>
    </div>
);

const PageTabs = ({ nodes, ...props }) => {
    const nUpgraded = nodes.filter(n => n.group === "upgraded").length;
    const nNotUpgraded = nodes.filter(n => n.group === "not_upgraded").length;
    const tabs = [
        { key: 'upgraded', repr: I18n.t('Upgraded (%{howMany})', { howMany: nUpgraded }) },
        { key: 'not_upgraded', repr: I18n.t('Not Upgraded (%{howMany})', { howMany: nNotUpgraded }) },
    ];
    return <Tabs tabs={tabs} {...props} />
}

export const UpgradedNodesPage_ = ({ nodes }) => {
    const [ selectedGroup, setselectedGroup ] = useState('upgraded');
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
                {nodes
                    .filter(n => n.status !== 'gone')
                    .filter(n => n.group === selectedGroup)
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

const UpgradedNodesPage = () => {
    const { data: nodes, isLoading: isLoadingNodes } = useNetworkNodes();
    const { data: newVersion, isLoading: isLoadingVersion} = useNewVersion();
    const [taggedNodes, setTaggedNodes] = useState(undefined);

    useEffect(() => {
        if (nodes && newVersion){
            const taggedNodes = [...nodes].map(
                n => ({ ...n,
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
