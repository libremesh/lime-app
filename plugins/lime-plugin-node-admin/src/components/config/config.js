import { h } from 'preact';
import style from './config.style.less';
import { ListItem } from 'components/list';

export const Config = ({ title, value, onClick }) => {
    return (
        <ListItem onClick={onClick}>
            <div class="d-flex flex-grow-1">
                <div>
                    <div class={style.title}> {title} </div>
                    <div class={style.value}> {value} </div>
                </div>
                <div class={style.arrowWrapper} >
                    <div class={style.arrow}>›</div>
                </div>
            </div>
        </ListItem>
    )
};
