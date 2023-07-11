import { Tick } from "components/icons/status";
import { ChevronUp } from "components/icons/teenny/chevrons";
import { ListItem } from "components/list-material";

const MeshWideUpgrade = () => {
    const title = "Your Title";
    const description = "Your Description";
    const info = "info";

    return (
        <div className={"flex flex-col gap-1 w-full"}>
            <ListItem
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
                rightComponent={<ChevronUp />}
                onClick={() => {}}
            />
        </div>
    );
};

export default MeshWideUpgrade;
