import { ComponentChildren } from "preact";

import { ListItem } from "components/list";
import Loading from "components/loading";

import style from "./config.style.less";

type ConfigProps = {
    title: ComponentChildren;
    subtitle?: ComponentChildren;
    value: ComponentChildren;
    onClick: () => void;
    isLoading: boolean;
};

export const Config = ({
    title,
    subtitle,
    value,
    onClick,
    isLoading,
    ...props
}: ConfigProps) => {
    return (
        <ListItem onClick={onClick} {...props}>
            <div className="d-flex flex-grow-1">
                <div>
                    <div className={style.title}> {title} </div>
                    {isLoading && <Loading />}
                    {!isLoading && (
                        <div>
                            {subtitle && (
                                <div className={style.subtitle}>
                                    {" "}
                                    {subtitle}{" "}
                                </div>
                            )}
                            <div className={style.value}> {value} </div>
                        </div>
                    )}
                </div>
                <div className={style.arrowWrapper}>
                    <div className={style.arrow}>›</div>
                </div>
            </div>
        </ListItem>
    );
};
