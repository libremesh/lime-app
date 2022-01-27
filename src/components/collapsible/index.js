import { h } from "preact";
import { useToggle } from 'react-use';
import style from './style.less';

export const Collapsible = ({ title, children, initCollapsed }) => {
    const [collapsed, toggleCollapsed] = useToggle(initCollapsed);
    return (
        <div class={`${style.collapsible} d-flex
            flex-column cursor-pointer`} onClick={toggleCollapsed}>
            <div class="d-flex">
                <div class="flex-grow-1">
                    {title}
                </div>
                <div>{collapsed ? 'ᐯ' : 'ᐱ'}</div>
            </div>
            {!collapsed &&
                <div class="flex-grow-1 mt-1">{children}</div>
            }
        </div>
    )

}
