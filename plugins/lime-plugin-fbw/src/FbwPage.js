import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import { useAppContext } from "utils/app.context";

import { FbwBanner } from "./containers/FbwBanner";
import { NetworkForm } from "./containers/NetworkForm";
import { Setting } from "./containers/Setting";
import { ScanPage } from "./containers/scanPage/ScanPage";
import "./style.less";

const Page = ({ ...props }) => {
    const { setMenuEnabled } = useAppContext();
    const [form, setForm] = useState(props.form);

    const [expectedHost, setExpectedHost] = useState(null);
    const [expectedNetwork, setExpectedNetwork] = useState(null);

    const toggleForm = (form) => () => {
        setForm(form);
        if (form === null) form = "";
        window.history.replaceState(null, null, `/#/firstbootwizard/${form}`);
    };

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
                <ScanPage
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
            {!form && <FbwBanner toggleForm={toggleForm} />}
        </Fragment>
    );
};

export default Page;
