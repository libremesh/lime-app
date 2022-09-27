import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import { useBoardData } from "utils/queries";

import { useAppContext } from "../../utils/app.context";
import style from "./style";

export const Header = ({ Menu }) => {
    const { data: boardData } = useBoardData();
    const { menuEnabled } = useAppContext();
    const [menuOpened, setMenuOpened] = useState(false);

    function toggleMenu() {
        setMenuOpened((prevValue) => !prevValue);
    }

    return (
        <Fragment>
            <header class={style.header}>
                {boardData && <h1>{boardData.hostname}</h1>}
                {boardData && menuEnabled && (
                    <div
                        className={`${style.hamburger} ${
                            menuOpened ? style.isActive : ""
                        }`}
                        onClick={toggleMenu}
                    >
                        <span>toogle menu</span>
                    </div>
                )}
            </header>
            <Menu opened={menuOpened} toggle={toggleMenu} />
        </Fragment>
    );
};
