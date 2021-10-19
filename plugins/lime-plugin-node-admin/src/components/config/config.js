import { h } from 'preact';
import style from './config.style.less';
import Loading from 'components/loading';
import { ListItem } from 'components/list';

export const Config = ({ title, subtitle, value, onClick, isLoading }) => {
    return (
        <ListItem onClick={onClick}>
            <div class="d-flex flex-grow-1">
                <div>
                    <div class={style.title}> {title} </div>
                    {isLoading && <Loading />}
                    {!isLoading &&
                        <div>
                            <div class={style.subtitle}> {subtitle} </div>
                            <div class={style.value}> {value} </div>
                        </div>
                    }
                </div>
                <div class={style.arrowWrapper} >
                    <div class={style.arrow}>›</div>
                </div>
            </div>
        </ListItem>
    )
};
