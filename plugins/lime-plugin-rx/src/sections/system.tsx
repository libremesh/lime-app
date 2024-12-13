import { Trans, plural, t } from "@lingui/macro";
import { Fragment } from "preact";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { GearIcon } from "plugins/lime-plugin-rx/src/icons/gearIcon";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import { useBoardData } from "utils/queries";
import { IGetBoardDataResponse } from "utils/types";

const toHHMMSS = (seconds: string, plus: number) => {
    const secNum = parseInt(seconds, 10) + plus;
    const days = Math.floor(secNum / 86400);
    const hours = Math.floor(secNum / 3600) % 24;
    const mins = Math.floor(secNum / 60) % 60;
    const secs = secNum % 60;
    const daysText = days
        ? plural(days, { one: "# day", other: "# days" })
        : null;
    const hoursText = hours
        ? plural(hours, { one: "# hour", other: "# hours" })
        : null;
    const minsText = mins
        ? plural(mins, { one: "# minute", other: "# minutes" })
        : null;
    const secsText = secs
        ? plural(secs, { one: "# second", other: "# seconds" })
        : null;
    const allTexts = [daysText, hoursText, minsText, secsText];
    return allTexts.filter((x) => x !== null).join(", ");
};

const SystemInfo = () => {
    const { data: node } = useNodeStatus();
    const { data: bd } = useBoardData();

    const boardData = bd as IGetBoardDataResponse;
    const secNum = parseInt(node?.uptime, 10);
    const attributes = [
        {
            label: t`Uptime`,
            value: toHHMMSS(node?.uptime, 0),
        },
        { label: t`Device`, value: boardData.board_name },
        { label: t`Firmware`, value: boardData.release.description },
    ];
    return (
        <div className="flex justify-start px-10">
            <div className="grid grid-cols-4 gap-4">
                {attributes.map((attribute, i) => (
                    <Fragment key={i}>
                        <div className="col-span-1 text-left pr-4 font-bold">
                            {attribute.label}:
                        </div>
                        <div className="col-span-3 text-left">
                            {attribute.value}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export const System = () => {
    const { isLoading: isLoadingNodeStatus } = useNodeStatus();
    const { isLoading: isLoadingBoardData } = useBoardData();

    const isLoading = isLoadingBoardData || isLoadingNodeStatus;

    return (
        <Section>
            <SectionTitle icon={<GearIcon className={IconsClassName} />}>
                <Trans>System</Trans>
            </SectionTitle>
            <div className={"mt-4"}>
                {isLoading ? <span>Loading...</span> : <SystemInfo />}
            </div>
        </Section>
    );
};
