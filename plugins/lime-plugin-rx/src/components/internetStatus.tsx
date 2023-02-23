import { Trans } from "@lingui/macro";

import { CirclecheckIcon } from "components/icons/circlecheckIcon";
import { XmarkIcon } from "components/icons/xmarkIcon";

import { IGetInternetStatus } from "plugins/lime-plugin-rx/src/rxApi";

export const InternetStatus = ({ data }: { data: IGetInternetStatus }) => {
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
            {Object.entries(data).map(([key, value]) => {
                if (key !== "status") {
                    return (
                        <div
                            class="flex justify-center items-center mr-4 mb-4 flex-1 gap-3 mt-4"
                            key={key}
                        >
                            {value.working ? (
                                <CirclecheckIcon className={checkIconClass} />
                            ) : (
                                <XmarkIcon className={xmarkIconClass} />
                            )}
                            <div class="text-center text-disabled text-lg ">
                                {key}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};
