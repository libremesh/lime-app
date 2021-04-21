import { h } from 'preact';
import I18n from 'i18n-js';
import { ListItem } from 'components/list';
import style from './style.less';

export const ExpandableNode = ({ node, showMore, onClick }) => {
    const { hostname, ipv4, ipv6, board, fw_version } = node;
    return (
        <ListItem onClick={onClick}>
            <div class="flex-grow-1">
                <div class="d-flex align-items-baseline">
                    <div class={style.hostname}>{hostname}</div>
                </div>
                {showMore &&
                    <div class={style.moreData} onClick={e => e.stopPropagation()}>
                        {ipv4 && <div>IPv4: <a href={`http://${ipv4}`}>{ipv4}</a></div>}
                        {ipv6 && <div>IPv6: {ipv6}</div>}
                        {board && <div>{I18n.t('Device')}: {board}</div>}
                        {fw_version && <div>{I18n.t('Firmware')}: {fw_version}</div>}
                    </div>
                }
            </div>
        </ListItem>
    )
}