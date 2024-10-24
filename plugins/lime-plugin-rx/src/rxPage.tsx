import { Fragment } from "preact";

import { Footer } from "plugins/lime-plugin-rx/src/components/footer";
import { Alignment } from "plugins/lime-plugin-rx/src/sections/alignment";
import { InternetPath } from "plugins/lime-plugin-rx/src/sections/internetPath";
import { System } from "plugins/lime-plugin-rx/src/sections/system";
import { Wired } from "plugins/lime-plugin-rx/src/sections/wired";

const Page = ({}) => {
    return (
        <Fragment>
            <div
                className={
                    "flex flex-col items-center -translate-y-6 w-full max-w-screen-md mx-auto"
                }
            >
                <InternetPath />
                <Alignment />
                <Wired />
                <System />
                <Footer />
            </div>
        </Fragment>
    );
};

export default Page;
