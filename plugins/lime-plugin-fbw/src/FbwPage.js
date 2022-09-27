import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import { useAppContext } from "utils/app.context";

import { NetworkForm } from "./containers/NetworkForm";
import { Scan } from "./containers/Scan";
import SelectAction from "./containers/SelectAction";
import { Setting } from "./containers/Setting";
import "./style.less";

const Page = ({}) => {
    const { setMenuEnabled } = useAppContext();
    const [form, setForm] = useState(null);

    const [expectedHost, setExpectedHost] = useState(null);
    const [expectedNetwork, setExpectedNetwork] = useState(null);

    const toggleForm = (form) => () => setForm(form);

    useEffect(() => {
        setMenuEnabled(false);
        return () => {
            setMenuEnabled(true);
        };
    }, [setMenuEnabled]);

    return (
        <Fragment>
            {form === "create" && (
                <NetworkForm
                    toggleForm={toggleForm}
                    setExpectedHost={setExpectedHost}
                    setExpectedNetwork={setExpectedNetwork}
                />
            )}
            {form === "scan" && (
                <Scan
                    toggleForm={toggleForm}
                    setExpectedHost={setExpectedHost}
                    setExpectedNetwork={setExpectedNetwork}
                />
            )}
            {form === "setting" && (
                <Setting
                    toggleForm={toggleForm}
                    expectedHost={expectedHost}
                    expectedNetwork={expectedNetwork}
                />
            )}
            {!form && <SelectAction toggleForm={toggleForm} />}
        </Fragment>
    );
};

export default Page;
