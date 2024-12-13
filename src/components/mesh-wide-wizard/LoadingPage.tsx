import { VNode } from "preact";

import Loading from "components/loading";
import { StepState } from "components/mesh-wide-wizard/StepState";

export const LoadingPage = ({
    title,
    description,
}: {
    title: VNode;
    description?: VNode;
}) => {
    return (
        <StepState title={title} icon={<Loading />}>
            {description}
        </StepState>
    );
};
