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

	const [showCancelError, setShowCancelError] = useState(false) 	// Backend send false on perform an action

    const [selectedNetwork, setSelectedNetwork] = useState({
		hostname: boardData?.hostname
	});

    /* Used to dismis previously selected network, ex: on back or rescan button */
    function _cancelSelectedNetwork( ) {
        setSelectedNetwork({
            ...selectedNetwork,
            file: "",
            apname: "",
            community: ""
        });
    }

    /* Mutatiion that stop the scan on backend */
    const [scanStop, { isError: stopError }] 
        = useScanStop({
            onSuccess: (val) => {
                if(val) {
                    _cancelSelectedNetwork()
                    // todo: this not working because toggle form change the screen and not show the toast
                    setShowCancelError(false)
                    toggleForm(null)()
                } 
                else setShowCancelError(true)
            }
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
            {(showCancelError || stopError) ? <Toast text={<Trans>Error stopping scan</Trans>} />  : null}
        </Fragment>
    );
}