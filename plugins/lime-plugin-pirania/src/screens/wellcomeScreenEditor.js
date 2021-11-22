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
    const { register, handleSubmit, errors } = useForm({
        defaultValues: { background_color: '#ffffff', ...content }
    });
    return (
        <Fragment>
            <form>
                <label for="title">{I18n.t('Title')}</label>
                <span>{I18n.t('Required')} {I18n.t('(Max. %{chars} characters)', { chars: 100 })}</span>
                <input type="text" name="title" id="title" class="w-100"
                    ref={register({ required: true, maxLength: 100 })}
                ></input>
                {errors.title?.type === 'required' &&
                    <p style={{ color: "#923838" }}>{I18n.t('This field is required')}</p>
                }
                {errors.title?.type === 'maxLength' &&
                    <p style={{ color: "#923838" }}>{I18n.t('(Max. %{chars} characters)', { chars: 100 })}</p>
                }
                <label for="main_text">{I18n.t('Main Text')}</label>
                <span>{I18n.t('Required')} {I18n.t('(Max. %{chars} characters)', { chars: 500 })}</span>
                <textarea name="main_text" id="main_text" class="w-100" style={{ minHeight: '9em' }}
                    ref={register({ required: true, maxLength: 500 })}
                ></textarea>
                {errors.main_text?.type === 'required' &&
                    <p style={{ color: "#923838" }}>{I18n.t('This field is required')}</p>
                }
                {errors.main_text?.type === 'maxLength' &&
                    <p style={{ color: "#923838" }}>{I18n.t('(Max. %{chars} characters)', { chars: 500 })}</p>
                }
                <label for="logo_file">{I18n.t('Community Logo')}</label>
                <div>
                    {isCompressing &&
                        <Loading />
                    }
                    {!isCompressing &&
                        <img src={logoCompressed} class="border border-primary rounded .container-padded" alt="logo-preview" />
                    }
                </div>
                <label class="button" htmlFor="logo_file">{I18n.t('Select file')}</label>
                <input style={{ width: 0 }} // Hide the ugly builtin input
                    accept="image/*"
                    onInput={onLogoFileSelection}
                    name="logo_file" id="logo_file" type="file" ref={register()} />
                <label for="background_color">{I18n.t('Background Color')}</label>
                <input type="color" name="background_color" id="background_color"
                    ref={register({ required: true })}
                ></input>
                {errors.background_color?.type === 'required' &&
                    <p style={{ color: "#923838" }}>{I18n.t('This field is required')}</p>
                }
                <h4>{I18n.t('Local services link')}</h4>
                <p>{I18n.t('If your community network has local services, you can point a link to them.')}</p>
                <label for="link_title">{I18n.t('Link Title')}</label>
                <span>{I18n.t('(Max. %{chars} characters)', { chars: 100 })}</span>
                <input type="text" name="link_title" id="link_title" class="w-100"
                    ref={register({ maxLength: 100 })}
                ></input>
                {errors.link_title?.type === 'maxLength' &&
                    <p style={{ color: "#923838" }}>{I18n.t('(Max. %{chars} characters)', { chars: 100 })}</p>
                }
                <label for="link_url">{I18n.t('Link URL')}</label>
                <span>{I18n.t('Starting with https:// or http://')}</span>
                <input type="text" name="link_url" id="link_url" class="w-100"
                    ref={register({ pattern: /^(http:\/\/|https:\/\/).*$/ })}
                ></input>
                {errors.link_url?.type === 'pattern' &&
                    <p style={{ color: "#923838" }}>{I18n.t('It must start with https:// or http://', { chars: 100 })}</p>
                }
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" disabled={isCompressing}>
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
        formData['logo'] = logoCompressed || content.logo;
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
