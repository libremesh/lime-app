
import { useTimeoutToggle } from '../hooks/timeoutToggle';
import { route } from 'preact-router';
import Loading from 'components/loading';
import Toast from 'components/toast';
import { Trans } from '@lingui/macro';

const ConfigPageLayout = ({ isLoading, title, isSuccess, isError, children, backUrl='/nodeadmin'}) => {
    const showSuccess = useTimeoutToggle(isSuccess, 1500);
    const showError = useTimeoutToggle(isError, 1500);

    if (isLoading) {
        return <div class="container container-center"><Loading /></div>;
    }

    return (
        <div class="container container-padded d-flex flex-column flex-grow-1">
            <div class="d-flex">
                <div class="clickable" aria-label="back" onClick={() => route(backUrl)}>❮</div>
                <h4 class="flex-grow-1 text-center">{title}</h4>
            </div>
            <div class="d-flex flex-grow-1 flex-column">
                {children}
            </div>
            { showSuccess && <Toast type="success" text={<Trans>Saved</Trans>} />}
            { showError && <Toast type="error" text={<Trans>Error: Not Saved</Trans>} />}
        </div>
    );
};

export default ConfigPageLayout;
