import { h } from 'preact';
import { useNetworkNodes } from './networkNodesQueries';
import { List } from 'components/list';
import { Loading } from 'components/loading';
import { ExpandableNode } from './components/expandableNode';
import style from './networkNodesStyle.less';
import { useState } from 'preact/hooks';
import I18n from 'i18n-js';

export const _NetworkNodes = ({ nodes, isLoading, unfoldedNode, onUnfold }) => {
    if (isLoading) {
        return <div class="container container-center"><Loading /></div>
    }
    return (
        <div class="d-flex flex-column flex-grow-1 overflow-auto">
            <div class={style.title}>{I18n.t("Network Nodes")}</div>
            <List>
                {nodes.map((node) =>
                    <ExpandableNode key={node.hostname} 
                        node={node} showMore={node.hostname === unfoldedNode}
                        onClick={() => onUnfold(node.hostname)} />
                )}
            </List>
        </div>
    )
};

const NetworkNodes = () => {
    const { data: networkNodes, isLoading } = useNetworkNodes();
    const [ unfoldedNode, setunfoldedNode ] = useState(null);
    const sortedNodes = (networkNodes &&
        Object.entries(networkNodes)
            .map(([k, v]) => ({ ...v, hostname: k }))
            .filter(n => n.status !== 'gone')
            .sort((a, b) => a.hostname > b.hostname));

    function changeUnfolded(hostname) {
        if (unfoldedNode == hostname) {
            setunfoldedNode(null);
            return;
        }
        setunfoldedNode(hostname);
    }

    return <_NetworkNodes nodes={sortedNodes} isLoading={isLoading}
            unfoldedNode={unfoldedNode} onUnfold={changeUnfolded}/>;
}

export default NetworkNodes;
