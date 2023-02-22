import { Trans } from "@lingui/macro";

import { CirclecheckIcon } from "components/icons/circlecheckIcon";
import { XmarkIcon } from "components/icons/xmarkIcon";

export interface InternetStatusProps {
    data: {
        DNS: { working: boolean };
        IPv6: { working: boolean };
        IPv4: { working: boolean };
    };
}

export const InternetStatus = ({ data }: InternetStatusProps) => {
    const checkIconClass = "h-10 w-10 fill-primary-dark ";
    const xmarkIconClass = "h-10 w-10 fill-danger ";
    return (
        <div class="w-full flex items-center flex-row p-4 gap-6">
            <h2 class="text-end flex-1">
                <Trans>
                    Internet
                    <br />
                    connection
                </Trans>
            </h2>
            {Object.entries(data).map(([key, value]) => (
                <div
                    class="flex justify-center items-center mr-4 mb-4 flex-1 gap-3 mt-4"
                    key={key}
                >
                    {value.working ? (
                        <CirclecheckIcon className={checkIconClass} />
                    ) : (
                        <XmarkIcon className={xmarkIconClass} />
                    )}
                    <div class="text-center text-gray-500 text-lg ">{key}</div>
                </div>
            ))}
        </div>
    );
};
