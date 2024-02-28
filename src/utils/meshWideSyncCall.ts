import { MutationKey } from "@tanstack/query-core/src/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "preact/hooks";
import { useCallback } from "react";

import queryCache from "utils/queryCache";
import { useSharedData } from "utils/useSharedData";

export class ParallelMutationError extends Error {
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

interface IMutationFnVariables<TVariables> {
    ip: string;
    variables?: TVariables;
}

type SyncCallErrors = Array<Error | ParallelMutationError>;
type SyncCallResults<TResult> = TResult[];
type SyncCallCacheObject<TResult> = {
    errors: SyncCallErrors;
    results: SyncCallResults<TResult>;
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
        ParallelMutationError,
        IMutationFnVariables<TVariables>
    >;
}

/**
 * This hook is an implementation that will allow to call multiple mutations in parallel to different ips.
 *
 * In order to reuse the data on different parts, it implements caches using the queryCache. The results and errors for
 * all the calls are stored using useSharedData query.
 *
 * In addition, is possible to acces to every single call accesing to the [...mutationKey, ip] key on the queryCache.
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
    const [isLoading, setIsLoading] = useState(false);

    const { data: results, setData: setResults } = useSharedData<
        SyncCallCacheObject<TResult>
    >([...mutationKey, "results"]);

    const { mutateAsync } = useMutation<
        TResult,
        ParallelMutationError,
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
        setIsLoading(true);

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

        setResults({ errors, results: successfulResults });
        setIsLoading(false);
        return {
            errors, // This contains all the errors from the mutations
            results: successfulResults,
        };
    }, [_callSingleMutation, ips, setResults]);

    return {
        callMutations,
        errors: results?.errors, // This contains all the errors from the mutations
        results: results?.results,
        isLoading,
    };
};
