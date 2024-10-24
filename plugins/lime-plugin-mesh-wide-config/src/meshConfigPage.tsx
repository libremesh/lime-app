import { useState } from "preact/hooks";
import React from "react";

import { Button } from "components/elements/button";

import EditConfiguration from "plugins/lime-plugin-mesh-wide-config/src/containers/EditConfiguration";

const MeshConfigPage = () => {
    // State to show modal
    const [showEditConfig, setShowEditConfig] = useState(false);

    if (showEditConfig) {
        return <EditConfiguration onClose={() => setShowEditConfig(false)} />;
    }

    return <Button onClick={() => setShowEditConfig(true)}>Show modal</Button>;
};

export default MeshConfigPage;
