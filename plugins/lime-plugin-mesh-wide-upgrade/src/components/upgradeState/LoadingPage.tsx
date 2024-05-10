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
        <div className="flex flex-col text-center gap-4">
            <Loading />
            <div className="text-4xl font-bold">{title}</div>
            {description && <div className="text-2xl">{description}</div>}
        </div>
    );
};
