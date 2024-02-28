import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "preact/hooks";
import { useCallback } from "react";

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

export const useMeshWideSyncCall = <TVariables, TResult>(
    mutationFn: ({
        ip,
        variables,
    }: IMutationFnVariables<TVariables>) => Promise<TResult>,
    ips: string[],
    variables?: TVariables,
    options?: UseMutationOptions<
        TResult,
        ParallelMutationError,
        IMutationFnVariables<TVariables>
    >
) => {
    const [errors, setErrors] = useState<SyncCallErrors>([]);
    const [results, setResults] = useState<TResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync } = useMutation<
        TResult,
        ParallelMutationError,
        IMutationFnVariables<TVariables>
    >({ mutationFn, ...options });

    const callMutations = useCallback(async () => {
        setIsLoading(true);

        const mutations = ips.map((ip) => {
            return mutateAsync({ ip, variables });
        });
        const results = await Promise.allSettled(mutations);
        const errors: SyncCallErrors = results
            .filter((result) => result.status === "rejected")
            .map((result) => (result as PromiseRejectedResult).reason);
        const successfulResults: TResult[] = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => (result as PromiseFulfilledResult<TResult>).value);

        setErrors(errors);
        setResults(successfulResults);
        setIsLoading(false);
        return {
            errors, // This contains all the errors from the mutations
            results: successfulResults,
        };
    }, [ips, mutateAsync, variables]);

    return {
        callMutations,
        errors, // This contains all the errors from the mutations
        results,
        isLoading,
    };
};
