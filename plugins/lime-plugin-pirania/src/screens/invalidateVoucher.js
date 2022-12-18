import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import Loading from "components/loading";

import { useInvalidate } from "../piraniaQueries";

const InvalidateVoucher = ({ id }) => {
    const { mutateAsync: invalidate, isLoading } = useInvalidate();

    const onInvalidate = async () => {
        await invalidate(id);
        return route(`/access/view/${id}`);
    };
    return (
        <div className={`container container-padded container-center`}>
            <p>
                <Trans>
                    If you invalidate this voucher no one will be able to use it
                    anymore. This cannot be reverted.
                </Trans>
            </p>
            <p>
                <Trans>Are you sure?</Trans>
            </p>
            <button onClick={onInvalidate}>
                <Trans>Yes</Trans>
            </button>
            <button onClick={() => route(`/access/view/${id}`)}>
                <Trans>No, cancel</Trans>
            </button>
            {isLoading && (
                <div>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default InvalidateVoucher;
