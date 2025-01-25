import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";

import Modal, { ModalProps } from "components/Modal/Modal";
import { useDisclosure } from "components/Modal/useDisclosure";
import { useToast } from "components/toast/toastProvider";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";
import {
    useNodeStatus,
    useSetPortRole,
} from "plugins/lime-plugin-rx/src/rxQueries";
import {
    SupportedPortRoles,
    SwitchStatus,
} from "plugins/lime-plugin-rx/src/rxTypes";

import queryCache from "utils/queryCache";

const liro1 = [
    {
        device: "eth0.1",
        num: 5,
        role: "wan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 0,
        role: "cpu",
        link: "up",
    },
    {
        device: "eth1.2",
        num: 4,
        role: "lan",
        link: "up",
    },
    {
        device: "eth1.2",
        num: 6,
        role: "cpu",
        link: "up",
    },
];

const mocked = [
    {
        device: "eth1",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth0",
        num: "lan",
        role: "lan",
    },
    {
        device: "eth2",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth30",
        num: "lan",
        role: "lan",
    },
    {
        device: "eth214",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth05",
        num: "lan",
        role: "lan",
    },
];

const tplink = [
    {
        device: "eth0.1",
        num: 1,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 2,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.1",
        num: 3,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 4,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 0,
        role: "cpu",
        link: "up",
    },
    // Modifactions
    {
        device: "eth0.3",
        num: 0,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.3",
        num: 1,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.2",
        num: 0,
        role: "wan",
        link: "up",
    },

    {
        device: "eth0.2",
        num: 1,
        role: "wan",
        link: "up",
    },
];

type PortsByDevice = {
    [device: string]: SwitchStatus[];
};

const ChangeRoleConfirmationModal = ({
    newRole,
    ...rest
}: { newRole: string } & ModalProps) => {
    return (
        <Modal
            {...rest}
            title={<Trans>Changing role to {newRole}</Trans>}
            successBtnText={<Trans>Confirm</Trans>}
        >
            <div className={"flex flex-col gap-4"}>
                <p>
                    <Trans>
                        Changing the role of a port may cause network
                        interruptions. Are you sure you want to continue?
                    </Trans>
                </p>
            </div>
        </Modal>
    );
};

const PortRoleSelector = ({ port }: { port: SwitchStatus }) => {
    const { showToast } = useToast();
    const [newRole, setNewRole] = useState<SupportedPortRoles>();
    const { open, onOpen, onClose } = useDisclosure({
        onClose() {
            setNewRole(null);
        },
    });
    const { mutateAsync } = useSetPortRole({
        onSettled: () => {
            queryCache.invalidateQueries({
                queryKey: ["lime-rx", "node-status"],
            });
            onClose();
        },
        onError: (error) => {
            console.error(error);
            showToast({
                type: "error",
                text: (
                    <div>
                        <Trans>Error changing role: </Trans>
                        {error.message}
                    </div>
                ),
            });
        },
    });

    const changeRole = async () => {
        await mutateAsync({ ...port, role: newRole });
    };

    useEffect(() => {
        if (newRole) {
            onOpen();
        }
    }, [newRole]);

    const role = port.role.toLowerCase();
    if (role === "cpu") {
        return null;
    }
    let link = "fill-disabled";
    if (port.link?.toLowerCase() === "up") link = "fill-primary-dark";
    return (
        <div className={"flex flex-col justify-center items-center gap-2"}>
            <PortsIcon className={`h-12 w-12 ${link}`} />
            <select
                className={"pl-2 text-center"}
                value={role}
                onChange={(e) => {
                    setNewRole(
                        (e.target as HTMLSelectElement)
                            .value as SupportedPortRoles
                    );
                }}
            >
                <option value={role}>{role}</option>
                {Object.values(SupportedPortRoles)
                    .filter((supportedRoles) => supportedRoles !== role)
                    .map((filteredRole) => (
                        <option key={filteredRole} value={filteredRole}>
                            {filteredRole}
                        </option>
                    ))}
            </select>
            <ChangeRoleConfirmationModal
                newRole={newRole}
                onClose={onClose}
                isOpen={open}
                cancelBtn
                onSuccess={changeRole}
            />
        </div>
    );
};

const Ports = ({ switches: s }: { switches: SwitchStatus[] }) => {
    const switches = tplink;
    const ports: PortsByDevice = switches.reduce((acc, obj) => {
        const { device } = obj;
        if (!acc[device]) {
            acc[device] = [];
        }
        acc[device].push(obj);
        return acc;
    }, {});
    return (
        <div
            className={"flex flex-wrap px-10 gap-4 justify-between"}
            data-testid="ports-container"
        >
            {Object.entries(ports).map(([device, ports], k) => {
                return (
                    <div key={device} className={"flex flex-col h-fit gap-4"}>
                        <h2 className={"font-bold"}>{device.toUpperCase()}</h2>
                        <div
                            key={`${device}${k}`}
                            className={
                                "flex flex-row justify-center items-center gap-6"
                            }
                        >
                            {ports.map((port, k) => (
                                <PortRoleSelector port={port} key={k} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const Wired = () => {
    const { data: status, isLoading } = useNodeStatus();

    const switches = status?.switch_status;

    return (
        <Section>
            <SectionTitle icon={<PortsIcon className={IconsClassName} />}>
                <Trans>Wired connections</Trans>
            </SectionTitle>
            <div className={"mt-4"}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : switches.length ? (
                    <Ports switches={status.switch_status} />
                ) : (
                    <div className={"flex-1 flex justify-center"}>
                        No wired connections found
                    </div>
                )}
            </div>
        </Section>
    );
};
