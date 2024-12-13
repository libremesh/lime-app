import { MutationKey } from "@tanstack/query-core/src/types";
import { useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

/**
 * This hook is used as generic hook to share data between components using react query. On certain way is a state
 * management hook using the capabilities of the react query queryCache
 * @param queryKey
 */
export const useSharedData = <T>(
    queryKey: MutationKey
): { data: T | null; setData: (newData: T) => void } => {
    const { data } = useQuery<T | null>(queryKey, () => null);
    const setData = (newData: T) => queryCache.setQueryData(queryKey, newData);

    return { data, setData };
};
