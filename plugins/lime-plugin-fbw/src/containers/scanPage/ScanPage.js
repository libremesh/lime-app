import { ScanList } from './ScanList'
import { SelectForm } from './SelectForm'
import { useState } from 'preact/hooks';
import { useBoardData } from 'utils/queries';


export const ScanPage = ({ toggleForm, setExpectedHost, setExpectedNetwork }) => {
    const { data: boardData } = useBoardData();
    const [state, setState] = useState({
		createForm: false,
		error: null,
		hostname: boardData?.hostname
	});

    /* Used to dismis previously selected network, ex: on back or rescan button */
    function _cancelSelectedNetwork( ) {
        setState({
            ...state,
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
            {state.apname  
                ? <SelectForm 
                    toggleForm={toggleForm} 
                    setExpectedHost={setExpectedHost} 
                    setExpectedNetwork={setExpectedNetwork}
                    state={state} 
                    setState={setState} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                />
                : <ScanList
                    state={state}
                    setState={setState} 
                    cancelSelectedNetwork={_cancelSelectedNetwork} 
                    cancel={_cancel}
                /> }
        </>
    );
}