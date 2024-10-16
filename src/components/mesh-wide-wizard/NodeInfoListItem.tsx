import { ComponentChildren } from "preact";

import { StatusIcon, StatusIcons } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";
import UpdateSharedStateBtn from "components/shared-state/UpdateSharedStateBtn";
import { ISyncWithNodeProps } from "components/shared-state/useSharedStateSync";

export interface INodeInfoBodyItemProps {
    title: ComponentChildren;
    description: ComponentChildren;
}

const NodeInfoBodyItem = ({ title, description }: INodeInfoBodyItemProps) => (
    <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600">{description}</div>
    </div>
);

export interface INodeUpgradeInfoItemProps<T> {
    extraInfoItems?: Array<INodeInfoBodyItemProps>;
    status?: StatusIcons;
    name: string;
    descriptionMsg?: ComponentChildren;
    ip: string;
    sharedStateUpdateTypes: Pick<ISyncWithNodeProps, "types">["types"];
}

const NodeInfoListItem = <T,>({
    extraInfoItems,
    status,
    name,
    descriptionMsg,
    ip,
    sharedStateUpdateTypes,
}: INodeUpgradeInfoItemProps<T>) => {
    const showUpdateBtn = sharedStateUpdateTypes.length && !!ip;
    return (
        <ListItemCollapsible
            title={name}
            description={descriptionMsg}
            leftComponent={<StatusIcon status={status} />}
            rightText={
                <>
                    {showUpdateBtn && (
                        <UpdateSharedStateBtn
                            updateOnMount={false}
                            ip={ip}
                            nodeName={name}
                            types={sharedStateUpdateTypes}
                        />
                    )}
                </>
            }
        >
            {extraInfoItems?.map((item, index) => (
                <NodeInfoBodyItem
                    key={index}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </ListItemCollapsible>
    );
};

export default NodeInfoListItem;
