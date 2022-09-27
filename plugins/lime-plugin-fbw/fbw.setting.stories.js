/* eslint-disable react/jsx-no-bind */
import { storiesOf } from "@storybook/preact";
import { h } from "preact";

import FetchStory from "../../.storybook/mockFetch";
import { Setting } from "./src/containers/Setting";

storiesOf("Containers/First boot wizard", module)
    .add("Applying configuration - Correct network", () => (
        <FetchStory
            throttle={0}
            mocks={[
                {
                    matcher: "http://thisnode.info/cgi-bin/hostname",
                    response: {
                        body: "ql-anaymarcos\n",
                    },
                    options: {
                        method: "GET",
                    },
                },
            ]}
        >
            <Setting
                delay={100} //speedup
                expectedHost={"ql-anaymarcos"}
                expectedNetwork={"quintanalibre.org.ar"}
            />
        </FetchStory>
    ))
    .add("Applying configuration - Incorrect network", () => (
        <FetchStory
            throttle={0}
            silent
            mocks={[
                {
                    matcher: "http://thisnode.info/cgi-bin/hostname",
                    response: {
                        body: "ql-graciela\n",
                    },
                    options: {
                        method: "GET",
                    },
                },
            ]}
        >
            <Setting
                delay={100} //speedup
                expectedHost={"ql-anaymarcos"}
                expectedNetwork={"quintanalibre.org.ar"}
            />
        </FetchStory>
    ));
