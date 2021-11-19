import { h, Fragment } from "preact";
import I18n from "i18n-js";

import { ConfigPageLayout } from 'plugins/lime-plugin-node-admin/src/layouts';
import {
    usePortalContent, useSetPortalContent,
    useLogoCompression, useCreateCompression
} from '../piraniaQueries';
import { useForm } from 'react-hook-form';
import Loading from 'components/loading';

const WellcomeScreenEditorForm = (
    { content, logoCompressed, isCompressing,
        onLogoFileSelection, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: content
    });
    return (
        <Fragment>
            <form>
                <label for="title">{I18n.t('Title')}</label>
                <input type="text" name="title" id="title" class="w-100"
                    ref={register({ required: true, maxLength: 128 })}
                ></input>
                <label for="main_text">{I18n.t('Main Text')}</label>
                <textarea name="main_text" id="main_text" class="w-100" rows="6"
                    ref={register({ required: true, maxLength: 512 })}
                ></textarea>
                <label for="logo_file">{I18n.t('Community Logo')}</label>
                {logoCompressed &&
                    <div>
                        <img src={logoCompressed} alt="logo-preview" />
                    </div>
                }
                <label class="button" htmlFor="logo_file">{I18n.t('Select file')}</label>
                <input style={{ width: 0 }} // Hide the ugly builtin input
                    onInput={onLogoFileSelection}
                    name="logo_file" id="logo_file" type="file" ref={register()} />

                <h5>{I18n.t('Local services link')}</h5>
                <p>{I18n.t('If your community network has local services, you can point a link to them.')}</p>
                <label for="link_title">{I18n.t('Link Title')}</label>
                <input type="text" name="link_title" id="link_title"
                    ref={register({ maxLength: 128 })}
                ></input>
                <label for="link_url">{I18n.t('Link URL')}</label>
                <input type="text" name="link_url" id="link_url"
                    ref={register()}
                ></input>
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" disable={isCompressing}>
                            {I18n.t("Save")}
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
        formData['logo'] = logoCompressed;
        delete formData.logo_file;
        return setPortalContent(formData);
    }

    return (
        <ConfigPageLayout title={I18n.t('Wellcome Screen')}
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
