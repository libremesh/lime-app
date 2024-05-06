import style from "./style.less";

const Tabs = ({ tabs, current, onChange }) => (
    <div className={style.tabs} role="tablist">
        {tabs.map((tab) => (
            <div className={style.tabWrapper} key={tab.key}>
                <div
                    role="tab"
                    className={`${style.tab} ${
                        current === tab.key ? style.tabActive : ""
                    }`}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.repr}
                </div>
                <span className={style.separator} />
            </div>
        ))}
    </div>
);

export default Tabs;
