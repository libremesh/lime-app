import { h } from "preact";
import { List, ListItem } from 'components/list';
import Loading from 'components/loading';
import Toast from 'components/toast';
import { useEffect, useState } from 'preact/hooks';
import { useSet } from 'react-use';
import { useMarkNodesAsGone, useNetworkNodes } from 'plugins/lime-plugin-network-nodes/src/networkNodesQueries'
import style from './deleteNodesStyle.less';
import { Trans } from '@lingui/macro'; 

export const DeleteNodesPage_ = ({ nodes, onDelete, isSubmitting, isSuccess }) => {
    const [selectedNodes, { toggle, has, reset }] = useSet(new Set([]));
    const [showSuccess, setshowSuccess] = useState(false);
    const unreachableNodes = Object.values(nodes).filter(n => n.status === "unreachable");

    useEffect(() => {
        if (isSuccess) {
            reset();
            setshowSuccess(true);
            setTimeout(() => {
                setshowSuccess(false);
            }, 2000);
        }
    }, [isSuccess])

    return (
        <div class="d-flex flex-column flex-grow-1 overflow-auto ">
            <div class="d-flex flex-column flex-grow-1 overflow-auto container container-padded">
                <h4><Trans>Delete Nodes</Trans></h4>
                {unreachableNodes.length > 0 &&
                    <p>
                        <Trans>
                            Select the nodes which no longer belong to the network and
                            delete them from the list of unreachable nodes
                        </Trans>
                    </p>
                }
                {unreachableNodes.length === 0 &&
                    <p><Trans>There are no left unreachable nodes</Trans></p>
                }
                <List>
                    {unreachableNodes.map(node =>
                        <ListItem key={node.hostname} onClick={() => toggle(node.hostname)} >
                            <div class={style.nodeItem} >
                                <input type="checkbox" name="selected-nodes" id={node.hostname}
                                    checked={has(node.hostname)} />
                                {node.hostname}
                            </div>
                        </ListItem>
                    )}
                </List>
            </div>
            <div class={style.bottomAction}>
                <span>
                    <Plural value={Number(selectedNodes.size)}
                        one="# node selected"
                        other="# nodes selected"
                    />
                </span>
                {!isSubmitting &&
                    <button class="ml-auto"
                        onClick={() => onDelete([...selectedNodes])}
                        disabled={selectedNodes.size < 1}>
                        <Trans>Delete</Trans>
                    </button>
                }
                {isSubmitting &&
                    <div class="ml-auto">
                        <Loading />
                    </div>
                }
            </div>
            {showSuccess &&
                <Toast type={"success"} text={<Trans>Successfully deleted</Trans>} />
            }
        </div>
    )
};

const DeleteNodesPage = () => {
    const [deleteNodes, { isSubmitting, isSuccess }] = useMarkNodesAsGone();
    const { data: nodes, isLoading } = useNetworkNodes();
    if (isLoading) {
        return <div className="container container-center"><Loading /></div>
    }

    return <DeleteNodesPage_ nodes={nodes} onDelete={deleteNodes}
        isSubmitting={isSubmitting} isSuccess={isSuccess} />
}

export default DeleteNodesPage;
