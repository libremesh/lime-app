import { Trans } from "@lingui/macro";

import LineChart, { LineChartStep } from "components/PathChart";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";

import { useBoardData } from "utils/queries";

export const NewVersionAvailable = ({
    readyForUpgrade,
}: {
    readyForUpgrade?: boolean;
}) => {
    const { data: boardData } = useBoardData();
    const { data: newVersion } = useNewVersion();

    let steps: LineChartStep[] = [
        {
            text: (
                <Trans>
                    This node version
                    <br />
                    {boardData && boardData.release.version}
                </Trans>
            ),
            status: "SUCCESS",
        },
    ];

    if (!readyForUpgrade) {
        steps = [
            ...steps,
            {
                text: (
                    <Trans>
                        New available version:
                        <br />
                        {newVersion && newVersion.version}
                    </Trans>
                ),
                status: "SUCCESS",
            },
        ];
    } else {
        steps = [
            ...steps,
            {
                text: (
                    <Trans>
                        Downloaded version
                        <br />
                        {newVersion && newVersion.version}
                    </Trans>
                ),
                status: "SUCCESS",
            },
            {
                text: <Trans>Start mesh wide upgrade</Trans>,
                status: "SUCCESS",
            },
        ];
    }

    return (
        <div className="text-center flex flex-col gap-6">
            <div className="text-4xl">
                {readyForUpgrade ? (
                    <Trans>
                        Ready to start mesh wide
                        <br />
                        firmware upgrade
                    </Trans>
                ) : (
                    <Trans>New version available!</Trans>
                )}
            </div>
            <div className="flex flex-col items-center ">
                <LineChart steps={steps} />
            </div>
        </div>
    );
};
