import { VNode } from "preact";

import Loading from "components/loading";

export const LoadingPage = ({
    title,
    description,
}: {
    title: VNode;
    description?: VNode;
}) => {
    return (
        <div className="text-center">
            <Loading />
            <div className="text-4xl">{title}</div>
            {description && <div className="text-2xl">{description}</div>}
        </div>
    );
};
