import { h, Fragment } from "preact";
import { Trans } from '@lingui/macro';

import { ConfigPageLayout } from 'plugins/lime-plugin-node-admin/src/layouts';
import {
    usePortalContent, useSetPortalContent,
    useLogoCompression, useCreateCompression
} from '../piraniaQueries';
import {
    RequiredMsg, MaxLengthMsg,
    RequiredErrorMsg, MaxLengthErrorMsg
} from 'components/form';
import { useForm } from 'react-hook-form';
import Loading from 'components/loading';

const WellcomeScreenEditorForm = (
    { content, logoCompressed, isCompressing,
        onLogoFileSelection, onSubmit, isSubmitting }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: { background_color: '#ffffff', ...content }
    });
    return (
        <Fragment>
            <form>
                <label for="title"><Trans>Title</Trans></label>
                <span><RequiredMsg /> (<MaxLengthMsg length={100} />)</span>
                <input type="text" name="title" id="title" class="w-100"
                    ref={register({ required: true, maxLength: 100 })}
                ></input>
                {errors.title?.type === 'required' && <RequiredErrorMsg />}
                {errors.title?.type === 'maxLength' && <MaxLengthErrorMsg length={100} />}
                <label for="main_text"><Trans>Main Text</Trans></label>
                <span><RequiredMsg /> (<MaxLengthMsg length={500} />)</span>
                <textarea name="main_text" id="main_text" class="w-100" style={{ minHeight: '9em' }}
                    ref={register({ required: true, maxLength: 500 })}
                ></textarea>
                {errors.main_text?.type === 'required' && <RequiredErrorMsg />}
                {errors.main_text?.type === 'maxLength' && <MaxLengthErrorMsg length={500} />}
                <label for="logo_file"><Trans>Community Logo</Trans></label>
                <div>
                    {isCompressing &&
                        <Loading />
                    }
                    {!isCompressing &&
                        <img src={logoCompressed} class="border border-primary rounded .container-padded" alt="logo-preview" />
                    }
                </div>
                <label class="button" htmlFor="logo_file"><Trans>Select file</Trans></label>
                <input style={{ width: 0 }} // Hide the ugly builtin input
                    accept="image/*"
                    onInput={onLogoFileSelection}
                    name="logo_file" id="logo_file" type="file" ref={register()} />
                <label for="background_color"><Trans>Background Color</Trans></label>
                <input type="color" name="background_color" id="background_color"
                    ref={register({ required: true })}
                ></input>
                {errors.background_color?.type === 'required' && <RequiredErrorMsg />}
                <h4><Trans>Local services link</Trans></h4>
                <p><Trans>If your community network has local services, you can point a link to them.</Trans></p>
                <label for="link_title"><Trans>Link Title</Trans></label>
                <span><MaxLengthMsg length={100} /></span>
                <input type="text" name="link_title" id="link_title" class="w-100"
                    ref={register({ maxLength: 100 })}
                ></input>
                {errors.link_title?.type === 'maxLength' && <MaxLengthErrorMsg length={100} />}
                <label for="link_url"><Trans>Link URL</Trans></label>
                <span><Trans>It must start with https:// or http://</Trans></span>
                <input type="text" name="link_url" id="link_url" class="w-100"
                    ref={register({ pattern: /^(http:\/\/|https:\/\/).*$/ })}
                ></input>
                {errors.link_url?.type === 'pattern' &&
                    <p style={{ color: "#923838" }}><Trans>It must start with https:// or http://</Trans></p>
                }
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" disabled={isCompressing}>
                            <Trans>Save</Trans>
                        </button>
                    }
                    {isSubmitting &&
                        <Loading />
                    }
                </div>
            </div>
        </Fragment>
    )
}

export const WellcomeScreenEditor = () => {
    const { data: content, isLoading } = usePortalContent();
    const [setPortalContent, setPortalStatus] = useSetPortalContent();
    const { data: logoCompressed } = useLogoCompression();
    const [createCompression, { isLoading: isCompressing }] = useCreateCompression();

    const { isLoading: isSubmitting, isSuccess, isError } = setPortalStatus;

    const onLogoFileSelection = (e) => {
        return createCompression(e.target.files[0]);
    }

    const onSubmit = (formData) => {
        formData['logo'] = logoCompressed || content.logo;
        delete formData.logo_file;
        return setPortalContent(formData);
    }

    return (
        <ConfigPageLayout title={<Trans>Wellcome Screen</Trans>}
            isLoading={isLoading} isSuccess={isSuccess} isError={isError}>
            <WellcomeScreenEditorForm content={content}
                logoCompressed={logoCompressed || content?.logo}
                isCompressing={isCompressing}
                onLogoFileSelection={onLogoFileSelection}
                onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </ConfigPageLayout>
    )
};

export default WellcomeScreenEditor;
