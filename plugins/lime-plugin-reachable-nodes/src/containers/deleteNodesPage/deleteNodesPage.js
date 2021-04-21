import { h } from "preact";
import { List, ListItem } from 'components/list';
import Loading from 'components/loading';
import Toast from 'components/toast';
import { useEffect, useState } from 'preact/hooks';
import { useSet } from 'react-use';
import { useMarkNodesAsGone, useNetworkNodes } from '../../networkNodesQueries'
import style from './style.less';
import I18n from 'i18n-js';

export const DeleteNodesPage_ = ({ nodes, onDelete, isSubmitting, isSuccess }) => {
    const [selectedNodes, { toggle, has, reset }] = useSet(new Set([]));
    const [showSuccess, setshowSuccess] = useState(false);
    const disconnectedNodes = nodes.filter(n => n.status === "disconnected");

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
                <h4>{I18n.t("Delete Nodes")}</h4>
                {disconnectedNodes.length > 0 &&
                    <p>{I18n.t("Select the nodes which no longer belong to the network and "
                        + "delete them from the list of disconnected nodes")}</p>
                }
                {disconnectedNodes.length === 0 &&
                    <p>{I18n.t("There are no left discconected nodes")}</p>
                }
                <List>
                    {disconnectedNodes.map(node =>
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
            {selectedNodes.size >= 1 &&
                <div class={style.bottomAction}>
                    <span>
                        {[selectedNodes.size,
                        I18n.t('selected-nodes', { count: selectedNodes.size })
                        ].join(' ')}
                    </span>
                    {!isSubmitting &&
                        <button class="ml-auto" onClick={() => onDelete([...selectedNodes])}>
                            {I18n.t("Delete")}
                        </button>
                    }
                    {isSubmitting &&
                        <div class="ml-auto">
                            <Loading />
                        </div>
                    }
                </div>
            }
            {showSuccess &&
                <Toast type={"success"} text={I18n.t("Successfully deleted")} />
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