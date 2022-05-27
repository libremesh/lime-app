import { ScanList } from './ScanList'
import { SelectForm } from './SelectForm'
import { useState } from 'preact/hooks';
import { useBoardData } from 'utils/queries';


export const ScanPage = ({ toggleForm, setExpectedHost, setExpectedNetwork }) => {
    const { data: boardData } = useBoardData();
    const [selectedNetwork, setSelectedNetwork] = useState({
		error: null,
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

    /* Cancel and go back */
	function _cancel() {
        toggleForm(null)()
	}

    return (
        <>
            {selectedNetwork.apname  
                ? <SelectForm 
                    toggleForm={toggleForm} 
                    setExpectedHost={setExpectedHost} 
                    setExpectedNetwork={setExpectedNetwork}
                    state={selectedNetwork} 
                    setState={setSelectedNetwork} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                />
                : <ScanList
                    state={selectedNetwork}
                    setState={setSelectedNetwork} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                    cancel={_cancel}
                /> }
        </>
    );
}