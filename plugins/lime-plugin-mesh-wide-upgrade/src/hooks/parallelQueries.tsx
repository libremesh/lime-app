import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { getMeshUpgradeNodeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import { useMeshWideNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

import { UhttpdService } from "utils/uhttpd.service";

function login({
    username,
    password,
    api,
}: {
    username: string;
    password: string;
    api: UhttpdService;
}) {
    return api.login(username, password);
}

class ParallelMutationError extends Error {
    ip: string;
    error: Error;
    constructor(message: string, ip: string, error: Error) {
        super(message); // Pass the message to the Error constructor
        this.name = "ParallelMutationError"; // Set the name of the error
        this.ip = ip;
        this.error = error;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ParallelMutationError.prototype);
    }
}

async function startSafeUpgrade({ ip }: { ip: string }) {
    const api = new UhttpdService(ip);
    try {
        await login({ username: "lime-app", password: "generic", api });
    } catch (error) {
        throw new ParallelMutationError(`Cannot login for ${ip}`, ip, error);
    }
    try {
        // return await meshUpgradeApiCall("start_safe_upgrade");
        return await getMeshUpgradeNodeStatus();
    } catch (error) {
        throw new ParallelMutationError(
            `Cannot startSafeUpgrade for ${ip}`,
            ip,
            error
        );
    }
}

export const useStartSafeUpgrade = () => {
    // State to store the errors
    const { data: nodes } = useMeshWideNodes({});
    const ips = Object.entries(nodes || {}).map(
        // @ts-ignore
        ([_, node]) => node?.ipv4 ?? ""
    );
    return useParallelMutations(startSafeUpgrade, ips);
};

interface IMutationFnVariables<TVariables> {
    ip: string;
    variables?: TVariables;
}

const useParallelMutations = <TVariables, TResult>(
    mutationFn: ({
        ip,
        variables,
    }: IMutationFnVariables<TVariables>) => Promise<TResult>,
    ips: string[],
    variables?: TVariables,
    options?: UseMutationOptions<
        IMutationFnVariables<TVariables>,
        ParallelMutationError,
        Promise<TResult>
    >
) => {
    const { mutateAsync: startSafeUpgradeMutation } = useMutation<
        TResult,
        ParallelMutationError,
        IMutationFnVariables<TVariables>
    >(
        // @ts-ignore
        { mutationFn, ...options }
    );

    const callMutations = useCallback(async () => {
        const mutations = ips.map((ip) => {
            return startSafeUpgradeMutation({ ip, variables });
        });
        const results = await Promise.allSettled(mutations);
        const errors: Array<Error | ParallelMutationError> = results
            .filter((result) => result.status === "rejected")
            .map((result) => (result as PromiseRejectedResult).reason);
        const successfulResults: TResult[] = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => (result as PromiseFulfilledResult<TResult>).value);

        console.log("errors", errors);
        console.log("successfulResults", successfulResults);

        return {
            errors, // This contains all the errors from the mutations
            results: successfulResults,
        };
    }, [ips, mutationFn, variables]);

    return {
        callMutations,
        // errors, // This contains all the errors from the mutations
        // results: successfulResults,
    };
};
