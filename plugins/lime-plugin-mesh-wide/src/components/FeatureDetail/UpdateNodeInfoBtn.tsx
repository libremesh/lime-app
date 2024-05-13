import { useEffect } from "preact/hooks";

import { Button } from "components/buttons/button";
import { RefreshIcon } from "components/icons/teenny/refresh";

import useSyncWithNode, {
    ISyncWithNodeProps,
} from "plugins/lime-plugin-mesh-wide/src/hooks/useSyncWithNode";

const UpdateNodeInfoBtn = ({
    ip,
    nodeName,
    updateOnMount = true,
}: {
    updateOnMount?: boolean;
} & ISyncWithNodeProps) => {
    const { syncNode, isLoading } = useSyncWithNode({ ip, nodeName });

    // Use effect to sync the node data on mount
    useEffect(() => {
        if (!updateOnMount) return;
        (async () => {
            await syncNode();
        })();
        // Avoid executing the effect on updateOnMount change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ip]);

    return (
        <Button
            color={"primary"}
            outline
            disabled={isLoading}
            size={"sm"}
            onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await syncNode();
            }}
        >
            <RefreshIcon />
        </Button>
    );
};

export default UpdateNodeInfoBtn;
