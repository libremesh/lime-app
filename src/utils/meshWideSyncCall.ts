import { MutationKey } from "@tanstack/query-core/src/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import queryCache from "utils/queryCache";
import { useSharedData } from "utils/useSharedData";

export class RemoteNodeCallError extends Error {
    ip: string;
    error: Error;
    constructor(message: string, ip: string, error: Error) {
        super(message); // Pass the message to the Error constructor
        this.name = "ParallelMutationError"; // Set the name of the error
        this.ip = ip;
        this.error = error;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RemoteNodeCallError.prototype);
    }
}

interface IMutationFnVariables<TVariables> {
    ip: string;
    variables?: TVariables;
}

export type SyncCallErrors = Array<Error | RemoteNodeCallError>;
type SyncCallResults<TResult> = TResult[];
/**
 * This object is used to store the results and errors of all the mutations calls.
 * This data is stored on the queryCache using the useSharedData hook
 * Storing isLoading there makes us able to avoid using a context to share the loading state
 * between different hook instances. If we want to use a setState, we should wrap the hook
 * with a context for the whole app
 */
type SyncCallCacheObject<TResult> = {
    errors: SyncCallErrors;
    results: SyncCallResults<TResult>;
    isLoading?: boolean;
};

interface IMeshWideSyncCall<TVariables, TResult> {
    mutationKey: MutationKey;
    mutationFn: ({
        ip,
        variables,
    }: IMutationFnVariables<TVariables>) => Promise<TResult>;
    ips: string[];
    variables?: TVariables;
    options?: UseMutationOptions<
        TResult,
        RemoteNodeCallError,
        IMutationFnVariables<TVariables>
    >;
}

/**
 * This hook is an implementation that will allow to call multiple mutations in parallel to different ips.
 *
 * In order to reuse the data on different parts, it implements caches using the queryCache. The results and errors for
 * all the calls are stored using useSharedData query.
 *
 * In addition, is possible to access to every single call accessing to the [...mutationKey, ip] key on the queryCache.
 *
 * @param mutationKey Mutation key to store the results and errors
 * @param mutationFn Function that will be called for every ip
 * @param ips List of ips to call the mutation
 * @param variables Variables to pass to the mutation
 * @param options Options for the mutation
 */
export const useMeshWideSyncCall = <TVariables, TResult>({
    mutationKey,
    mutationFn,
    ips,
    variables,
    options,
}: IMeshWideSyncCall<TVariables, TResult>) => {
    const { data: mutationResults, setData: setResults } = useSharedData<
        SyncCallCacheObject<TResult>
    >([...mutationKey, "results"]);

    const { mutateAsync } = useMutation<
        TResult,
        RemoteNodeCallError,
        IMutationFnVariables<TVariables>
    >({ mutationFn, mutationKey, ...options });

    const _callSingleMutation = useCallback(
        async (ip: string) => {
            try {
                const result = await mutateAsync({ ip, variables });
                queryCache.setQueryData([...mutationKey, ip], result);
                return result;
            } catch (error) {
                queryCache.setQueryData([...mutationKey, ip], error);
                throw error;
            }
        },
        [mutationKey, mutateAsync, variables]
    );

    const callMutations = useCallback(async () => {
        if (mutationResults?.isLoading) return mutationResults;

        setResults({ errors: [], results: [], isLoading: true });

        const mutations = ips.map((ip) => {
            return _callSingleMutation(ip);
        });

        const results = await Promise.allSettled(mutations);

        const errors: SyncCallErrors = results
            .filter((result) => result.status === "rejected")
            .map((result) => (result as PromiseRejectedResult).reason);
        const successfulResults: SyncCallResults<TResult> = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => (result as PromiseFulfilledResult<TResult>).value);

        setResults({ errors, results: successfulResults, isLoading: false });
        return {
            errors, // This contains all the errors from the mutations
            results: successfulResults,
        };
    }, [_callSingleMutation, ips, mutationResults, setResults]);

    return {
        callMutations,
        errors: mutationResults?.errors, // This contains all the errors from the mutations
        results: mutationResults?.results,
        isLoading: mutationResults?.isLoading,
    };
};
