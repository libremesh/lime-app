import style from "./style.less";

const Tabs = ({ tabs, current, onChange }) => (
    <div class={style.tabs} role="tablist">
        {tabs.map((tab, index) => (
            <div class={style.tabWrapper} key={index}>
                <div
                    role="tab"
                    class={`${style.tab} ${
                        current === tab.key ? style.tabActive : ""
                    }`}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.repr}
                </div>
                <span class={style.separator} />
            </div>
        ))}
    </div>
);

export default Tabs;
