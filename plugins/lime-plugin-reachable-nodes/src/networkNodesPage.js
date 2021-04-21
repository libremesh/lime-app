import { h } from "preact";
import { useState } from "preact/hooks";
import style from "./style.less";
import Tabs from "components/tabs";
import Loading from "components/loading";
import { List, ListItem } from "components/list";
import { useNetworkNodes } from "./networkNodesQueries";
import Help from "components/help";
import I18n from 'i18n-js';

const DeleteNodesLegend = () => (
    <div class={style.deleteNodesLegend}>
        <div>{I18n.t("If some of these nodes no longer belong " +
            "to the network you can delete them from Delete Nodes.")}</div>
        <div><a href="/delete-nodes">{I18n.t("Go to Delete Nodes")}</a></div>
    </div>
)

const PageHelp = () => (
    <div>
        <p>
            <h5>{I18n.t("Connected Nodes")}</h5>
            {I18n.t("These are the nodes with which you have connectivity, " +
                "i.e. there is a working path from your node to each of them.")}
        </p>
        <p>
            <h5>{I18n.t("Disconnected Nodes")}</h5>
            {I18n.t("These are the nodes with which you do not have connectivity, " +
                "it is possible that they are not turned on or a link to reach them is down.")}
        </p>
    </div>
);

const PageTabs = ({ nodes, ...props }) => {
    const nConnected = nodes.filter(n => n.status === "connected").length;
    const nDisconnected = nodes.filter(n => n.status === "disconnected").length;
    const tabs = [
        { key: 'connected', repr: I18n.t('Connected (%{howMany})', { howMany: nConnected }) },
        { key: 'disconnected', repr: I18n.t('Disconnected (%{howMany})', { howMany: nDisconnected }) },
    ];
    return <Tabs tabs={tabs} {...props} />
}

export const NetworkNodesPage_ = ({ nodes }) => {
    const [selectedGroup, setselectedGroup] = useState('connected');
    return (
        <div class="d-flex flex-column flex-grow-1 overflow-auto">
            <div class="d-flex">
                <PageTabs nodes={nodes} current={selectedGroup} onChange={setselectedGroup} />
                <div class={`${style.helpWrapper} ml-auto`}>
                    <Help Content={PageHelp} />
                </div>
            </div>
            <List>
                {nodes
                    .filter(n => n.status === selectedGroup)
                    .sort((a, b) => a.hostname > b.hostname)
                    .map(
                        node =>
                            <ListItem>
                                <div class={style.nodeItem}>
                                    {node.hostname}
                                </div>
                            </ListItem>
                    )}
                {selectedGroup === "disconnected" &&
                    nodes.filter(n => n.status == "disconnected").length &&
                    <DeleteNodesLegend />
                }
            </List>
        </div>
    )
}

const NetworkNodesPage = () => {
    const { data: nodes, isLoading } = useNetworkNodes();

    if (isLoading) {
        return <div className="container container-center"><Loading /></div>
    }

    return <NetworkNodesPage_ nodes={nodes} />
}

export default NetworkNodesPage