import { Fragment } from "preact";

import { Alignment } from "plugins/lime-plugin-rx/src/sections/alignment";
import { InternetPath } from "plugins/lime-plugin-rx/src/sections/internetPath";
import { Wired } from "plugins/lime-plugin-rx/src/sections/wired";
import {Footer} from "plugins/lime-plugin-rx/src/components/footer";

const Page = ({}) => {
    return (
        <Fragment>
            <div
                className={
                    "my-0 mx-auto flex flex-col h-screen items-center -translate-y-6"
                }
            >
                <InternetPath />
                <Alignment />
                <Wired />
                <Footer />
            </div>
        </Fragment>
    );
};

export default Page;
