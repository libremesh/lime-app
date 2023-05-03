import style from "./style.less";

type LoadingProps = {
    color?: string
}

export const Loading = ({ color } : LoadingProps) => {
    const styleOverride = color ? { backgroundColor: color } : undefined;
    return (
        <div
            className={style.spinner}
            aria-label="loading"
            data-testid="loading"
        >
            <div className={style.bounce1} style={styleOverride} />
            <div className={style.bounce2} style={styleOverride} />
            <div className={style.bounce3} style={styleOverride} />
        </div>
    );
};

export default Loading;
