import { Tick } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";
import Notification from "components/notifications/notification";

const MeshWideUpgrade = () => {
    const title = "Your Title";
    const description = "Your Description";
    const info = "info";

    return (
        <div className={"flex flex-col gap-1 w-full"}>
            <Notification
                title={"Upgrade available!"}
                rightText={"10 November"}
            >
                Some of the network nodes can be upgraded! Press the button to
                download the software.
            </Notification>
            <ListItemCollapsible
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
            >
                {" "}
                helloworld{" "}
            </ListItemCollapsible>
            <ListItemCollapsible
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
            >
                {" "}
                hellowbvb vfdaorld{" "}
            </ListItemCollapsible>
            <ListItemCollapsible
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
            >
                {" "}
                hellowofdsdcxzvrld{" "}
            </ListItemCollapsible>
            <ListItemCollapsible
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
            >
                {" "}
                helloworqewgewrld{" "}
            </ListItemCollapsible>
            <ListItemCollapsible
                title={title}
                description={description}
                leftComponent={<Tick />}
                rightText={info}
            >
                {" "}
                hellowoddsadsrld{" "}
            </ListItemCollapsible>
        </div>
    );
};

export default MeshWideUpgrade;
