import { Fragment } from "preact";

import { Alignment } from "plugins/lime-plugin-rx/src/sections/alignment";
import { InternetPath } from "plugins/lime-plugin-rx/src/sections/internetPath";
import { Wired } from "plugins/lime-plugin-rx/src/sections/wired";

const Page = ({}) => {
    return (
        <Fragment>
            <div
                className={
                    "container container-padded flex flex-col h-screen items-center"
                }
            >
                <InternetPath />
                <Alignment />
                <Wired />
            </div>
        </Fragment>
    );
};

export default Page;
