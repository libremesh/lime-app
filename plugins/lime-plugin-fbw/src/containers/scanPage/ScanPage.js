import { h, Fragment } from 'preact';
import { ScanList } from './ScanList'
import { SelectForm } from './SelectForm'
import { useState } from 'preact/hooks';
import { useBoardData } from 'utils/queries';
import { useScanStop } from '../../FbwQueries';
import Toast from 'components/toast';
import { Trans } from '@lingui/macro';


export const ScanPage = ({ toggleForm, setExpectedHost, setExpectedNetwork }) => {
    const { data: boardData } = useBoardData();

    const [selectedNetwork, setSelectedNetwork] = useState({
		hostname: boardData?.hostname
	});

    /* Used to dismiss previously selected network, ex: on back or rescan button */
    function _cancelSelectedNetwork( ) {
        setSelectedNetwork({
            ...selectedNetwork,
            file: "",
            apname: "",
            community: ""
        });
    }

    const [scanStop, { isError: stopError }] 
        = useScanStop({
            onSuccess: () => {
                _cancelSelectedNetwork()
                toggleForm(null)()
            },
        })

    /* Cancel and go back */
	function _cancel() {
        scanStop()
	}

    return (
        <Fragment>
            {selectedNetwork.apname  
                ? <SelectForm 
                    toggleForm={toggleForm} 
                    setExpectedHost={setExpectedHost} 
                    setExpectedNetwork={setExpectedNetwork}
                    selectedNetwork={selectedNetwork} 
                    setSelectedNetwork={setSelectedNetwork} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                    cancel={_cancel}
                />
                : <ScanList
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                    cancel={_cancel}
                /> }
            {(stopError) ? <Toast text={<Trans>Error stopping scan</Trans>} />  : null}
        </Fragment>
    );
}