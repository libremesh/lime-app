import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useForm } from "react-hook-form";

import {
    MaxLengthErrorMsg,
    MaxLengthMsg,
    RequiredErrorMsg,
    RequiredMsg,
} from "components/form";
import Loading from "components/loading";

import { ConfigPageLayout } from "plugins/lime-plugin-node-admin/src/layouts";

import {
    useCreateCompression,
    useLogoCompression,
    usePortalContent,
    useSetPortalContent,
} from "../piraniaQueries";

const WellcomeScreenEditorForm = ({
    content,
    logoCompressed,
    isCompressing,
    onLogoFileSelection,
    onSubmit,
    isSubmitting,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { background_color: "#ffffff", ...content },
    });
    return (
        <Fragment>
            <form>
                <label htmlFor="title">
                    <Trans>Title</Trans>
                </label>
                <span>
                    <RequiredMsg /> (<MaxLengthMsg length={100} />)
                </span>
                <input
                    type="text"
                    id="title"
                    className="w-100"
                    {...register("title", { required: true, maxLength: 100 })}
                />
                {errors.title?.type === "required" && <RequiredErrorMsg />}
                {errors.title?.type === "maxLength" && (
                    <MaxLengthErrorMsg length={100} />
                )}
                <label htmlFor="main_text">
                    <Trans>Main Text</Trans>
                </label>
                <span>
                    <RequiredMsg /> (<MaxLengthMsg length={500} />)
                </span>
                <textarea
                    id="main_text"
                    className="w-100"
                    style={{ minHeight: "9em" }}
                    {...register("main_text", {
                        required: true,
                        maxLength: 500,
                    })}
                />
                {errors.main_text?.type === "required" && <RequiredErrorMsg />}
                {errors.main_text?.type === "maxLength" && (
                    <MaxLengthErrorMsg length={500} />
                )}
                <label htmlFor="logo_file">
                    <Trans>Community Logo</Trans>
                </label>
                <div>
                    {isCompressing && <Loading />}
                    {!isCompressing && (
                        <img
                            src={logoCompressed}
                            className="border border-primary rounded .container-padded"
                            alt="logo-preview"
                        />
                    )}
                </div>
                <label className="button" htmlFor="logo_file">
                    <Trans>Select file</Trans>
                </label>
                <input
                    style={{ width: 0 }} // Hide the ugly builtin input
                    accept="image/*"
                    onInput={onLogoFileSelection}
                    id="logo_file"
                    type="file"
                    {...register("logo_file")}
                />
                <label htmlFor="background_color">
                    <Trans>Background Color</Trans>
                </label>
                <input
                    type="color"
                    id="background_color"
                    {...register("background_color", { required: true })}
                />
                {errors.background_color?.type === "required" && (
                    <RequiredErrorMsg />
                )}
                <h4>
                    <Trans>Local services link</Trans>
                </h4>
                <p>
                    <Trans>
                        If your community network has local services, you can
                        point a link to them.
                    </Trans>
                </p>
                <label htmlFor="link_title">
                    <Trans>Link Title</Trans>
                </label>
                <span>
                    <MaxLengthMsg length={100} />
                </span>
                <input
                    type="text"
                    id="link_title"
                    className="w-100"
                    {...register("link_title", { maxLength: 100 })}
                />
                {errors.link_title?.type === "maxLength" && (
                    <MaxLengthErrorMsg length={100} />
                )}
                <label htmlFor="link_url">
                    <Trans>Link URL</Trans>
                </label>
                <span>
                    <Trans>It must start with https:// or http://</Trans>
                </span>
                <input
                    type="text"
                    id="link_url"
                    className="w-100"
                    {...register("link_url", {
                        pattern: /^(http:\/\/|https:\/\/).*$/,
                    })}
                />
                {errors.link_url?.type === "pattern" && (
                    <p style={{ color: "#923838" }}>
                        <Trans>It must start with https:// or http://</Trans>
                    </p>
                )}
            </form>
            <div className="d-flex">
                <div className="ml-auto">
                    {!isSubmitting && (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="ml-auto"
                            disabled={isCompressing}
                        >
                            <Trans>Save</Trans>
                        </button>
                    )}
                    {isSubmitting && <Loading />}
                </div>
            </div>
        </Fragment>
    );
};

export const WellcomeScreenEditor = () => {
    const { data: content, isLoading } = usePortalContent();
    const {
        mutate: setPortalContent,
        isLoading: isSubmitting,
        isSuccess,
        isError,
    } = useSetPortalContent();
    const { data: logoCompressed } = useLogoCompression();
    const { mutate: createCompression, isLoading: isCompressing } =
        useCreateCompression();

    const onLogoFileSelection = (e) => {
        return createCompression(e.target.files[0]);
    };

    const onSubmit = (formData) => {
        formData["logo"] = logoCompressed || content.logo;
        delete formData.logo_file;
        return setPortalContent(formData);
    };

    return (
        <ConfigPageLayout
            title={<Trans>Wellcome Screen</Trans>}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
        >
            <WellcomeScreenEditorForm
                content={content}
                logoCompressed={logoCompressed || content?.logo}
                isCompressing={isCompressing}
                onLogoFileSelection={onLogoFileSelection}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />
        </ConfigPageLayout>
    );
};

export default WellcomeScreenEditor;
