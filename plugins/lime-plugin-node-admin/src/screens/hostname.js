import { Trans } from "@lingui/macro";
import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";

import Loading from "components/loading";

import { isValidHostname, slugify } from "utils/isValidHostname";
import { useBoardData } from "utils/queries";

import ConfigPageLayout from "../layouts/configPageLayout";
import { useChangeHostname } from "../nodeAdminQueries";

const HostnamePage = () => {
    const { data: boardData, isLoading } = useBoardData();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const {
        mutate: changeHostname,
        isLoading: isSubmitting,
        isSuccess,
        isError,
    } = useChangeHostname();

    useEffect(() => {
        reset({ hostname: boardData && boardData.hostname });
    }, [boardData, reset]);

    function onSubmit({ hostname }) {
        changeHostname(hostname);
    }

    return (
        <ConfigPageLayout
            {...{
                isLoading,
                isSuccess,
                isError,
                title: <Trans>Node Name</Trans>,
            }}
        >
            <form className="flex-grow-1">
                <label className="d-none" htmlFor="hostname">
                    <Trans>Node Name</Trans>
                </label>
                <input
                    type="text"
                    id="hostname"
                    {...register("hostname", {
                        required: true,
                        validate: {
                            validHostname: (v) => isValidHostname(v, true),
                        },
                    })}
                    onChange={(v) =>
                        setValue(
                            "hostname",
                            // @ts-ignore
                            slugify(v.target.value.toLowerCase())
                        )
                    }
                    className="w-100"
                />
                {errors.hostname && (
                    <p className="text-danger">
                        <Trans>
                            The name should have at least 3 characters
                        </Trans>
                    </p>
                )}
            </form>
            <div className="d-flex">
                <div className="ml-auto">
                    {!isSubmitting && (
                        <button
                            // @ts-ignore
                            onClick={handleSubmit(onSubmit)}
                            className="ml-auto"
                        >
                            <Trans>Save</Trans>
                        </button>
                    )}
                    {isSubmitting && <Loading />}
                </div>
            </div>
        </ConfigPageLayout>
    );
};

export default HostnamePage;
