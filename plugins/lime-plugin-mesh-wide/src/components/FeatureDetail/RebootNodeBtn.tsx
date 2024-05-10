import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "preact/hooks";
import { useCallback } from "react";

import { useModal } from "components/Modal/Modal";
import { Button } from "components/buttons/button";
import { ErrorMsg } from "components/form";
import Loading from "components/loading";

import { callToRemoteNode } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface IRemoteRebotProps {
    ip: string;
    password: string;
}

export async function remoteReboot({ ip, password }: IRemoteRebotProps) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            customApi.call("system", "reboot", {}).then(() => true),
        username: "root",
        password,
    });
}

const useRemoteReboot = (opts?) => {
    return useMutation((props: IRemoteRebotProps) => remoteReboot(props), {
        mutationKey: ["system", "reboot"],
        ...opts,
    });
};

const useRebootNodeModal = ({ node }: { node: INodeInfo }) => {
    const { toggleModal, setModalState, isModalOpen } = useModal();
    const [password, setPassword] = useState("");
    const { mutate, isLoading, error } = useRemoteReboot({
        onSuccess: () => {
            toggleModal();
        },
    });

    function changePassword(e) {
        setPassword(e.target.value || "");
    }

    const doLogin = useCallback(() => {
        mutate({ ip: node.ipv4, password });
    }, [mutate, node.ipv4, password]);

    const updateModalState = useCallback(() => {
        setModalState({
            title: <Trans>Reboot node {node.hostname}</Trans>,
            content: (
                <div>
                    <Trans>
                        Are you sure you want to reboot this node? This action
                        will disconnect the node from the network for a few
                        minutes. <br />
                        Add shared password or let it empty if no password is
                        set.
                    </Trans>
                    {isLoading && <Loading />}
                    {!isLoading && (
                        <div className={"mt-4"}>
                            <label htmlFor={"password"}>Node password</label>
                            <input
                                type="password"
                                id={"password"}
                                value={password}
                                onInput={changePassword}
                            />
                            {error && (
                                <ErrorMsg>
                                    <Trans>
                                        Error performing reboot: {error}
                                    </Trans>
                                </ErrorMsg>
                            )}
                        </div>
                    )}
                </div>
            ),
            successCb: doLogin,
            successBtnText: <Trans>Reboot</Trans>,
        });
    }, [doLogin, error, isLoading, node.hostname, password, setModalState]);

    const rebootModal = useCallback(() => {
        updateModalState();
        toggleModal();
    }, [toggleModal, updateModalState]);

    // Update modal state with mutation result
    useEffect(() => {
        if (isModalOpen) {
            updateModalState();
        }
    }, [isLoading, error, isModalOpen, updateModalState]);

    return { rebootModal, toggleModal, isModalOpen };
};

const RemoteRebootBtn = ({ node }: { node: INodeInfo }) => {
    const { rebootModal, isModalOpen } = useRebootNodeModal({
        node,
    });

    return (
        <Button
            color={"danger"}
            outline={true}
            size={"sm"}
            onClick={() => !isModalOpen && rebootModal()}
        >
            <PowerIcon />
        </Button>
    );
};

export default RemoteRebootBtn;
