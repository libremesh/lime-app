import { useEffect } from "preact/hooks";

import { Button } from "components/buttons/button";
import { RefreshIcon } from "components/icons/teenny/refresh";
import useSharedStateSync, {
    ISyncWithNodeProps,
} from "components/shared-state/useSharedStateSync";

const UpdateSharedStateBtn = ({
    updateOnMount = true,
    ...rest
}: {
    updateOnMount?: boolean;
} & ISyncWithNodeProps) => {
    const { syncNode, isLoading } = useSharedStateSync({ ...rest });

    // Use effect to sync the node data on mount
    useEffect(() => {
        if (!updateOnMount) return;
        (async () => {
            await syncNode();
        })();
        // Avoid executing the effect on updateOnMount change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest]);

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

export default UpdateSharedStateBtn;
