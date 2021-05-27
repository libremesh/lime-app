import { h } from 'preact';
import { useForm } from 'react-hook-form';
import { useEffect } from 'preact/hooks';
import { isValidHostname, slugify } from 'utils/isValidHostname';
import { useBoardData } from 'utils/queries';
import { useChangeHostname } from '../nodeAdminQueries';
import ConfigPageLayout from '../layouts/configPageLayout';
import Loading from 'components/loading';
import I18n from 'i18n-js';

const HostnamePage = () => {
    const { data: boardData, isLoading } = useBoardData();
    const { register, handleSubmit, reset, setValue, errors } = useForm();
    const [changeHostname, { isLoading: isSubmitting, isSuccess, isError }] = useChangeHostname();

    useEffect(() => {
        reset({ hostname: boardData && boardData.hostname });
    }, [boardData]);

    function onSubmit({ hostname }) {
        changeHostname(hostname);
    };

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
            title: I18n.t("Node Name")
        }}>
            <form class="flex-grow-1">
                <label class="d-none" htmlFor="hostname">{I18n.t("Node Name")}</label>
                <input type="text" name="hostname" id="hostname"
                    ref={register({
                        required: true,
                        validate: { validHostname: (v) => isValidHostname(v, true) }
                    })}
                    onChange={(v) => setValue("hostname", slugify(v.target.value.toLowerCase()))}
                    class="w-100" />
                {errors && errors.hostname &&
                    <p class="text-danger">
                        {I18n.t('The name should have at least 3 characters')}
                    </p>
                }
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            {I18n.t("Save")}
                        </button>
                    }
                    {isSubmitting &&
                        <Loading />
                    }
                </div>
            </div>
        </ConfigPageLayout >
    )
}

export default HostnamePage;
