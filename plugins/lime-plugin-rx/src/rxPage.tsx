import { Fragment } from "preact";

import { Footer } from "plugins/lime-plugin-rx/src/components/footer";
import { Alignment } from "plugins/lime-plugin-rx/src/sections/alignment";
import { InternetPath } from "plugins/lime-plugin-rx/src/sections/internetPath";
import { Wired } from "plugins/lime-plugin-rx/src/sections/wired";

const Page = ({}) => {
    return (
        <Fragment>
            <div
                className={
                    "my-0 flex flex-col justify-between items-center -translate-y-6 container container-padded"
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
