import FetchStory from "../../.storybook/mockFetch";
import { Setting } from "./src/containers/Setting";

export default {
    title: "Containers/First boot wizard",
};

export const ApplyingConfigurationCorrectNetwork = () => (
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
);

export const ApplyingConfigurationIncorrectNetwork = () => (
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
);
