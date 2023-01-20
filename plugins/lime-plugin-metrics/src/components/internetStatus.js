import { Trans } from "@lingui/macro";

import { Box } from "components/box";

export const InternetStatus = ({ isLoading, internet }) => {
    return isLoading ? (
        <div />
    ) : (
        <Box
            title={<Trans>Internet connection</Trans>}
            style={{ marginTop: "15px" }}
        >
            <span>
                <b>
                    {" "}
                    {internet.IPv4.working === true ? (
                        <span style={{ color: "green" }}>✔</span>
                    ) : (
                        <span style={{ color: "red" }}>✘</span>
                    )}{" "}
                    IPv4{" "}
                </b>
                <b>
                    {" "}
                    {internet.IPv6.working === true ? (
                        <span style={{ color: "green" }}>✔</span>
                    ) : (
                        <span style={{ color: "red" }}>✘</span>
                    )}{" "}
                    IPv6{" "}
                </b>
                <b>
                    {" "}
                    {internet.DNS.working === true ? (
                        <span style={{ color: "green" }}>✔</span>
                    ) : (
                        <span style={{ color: "red" }}>✘</span>
                    )}{" "}
                    DNS{" "}
                </b>
            </span>
        </Box>
    );
};
