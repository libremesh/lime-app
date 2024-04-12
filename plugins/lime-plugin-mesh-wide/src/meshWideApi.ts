import { QueryKey } from "@tanstack/react-query";

import {
    DataTypeMap,
    DataTypes,
    SharedStateReturnType,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import api from "utils/uhttpd.service";

export const getSharedStateApiCall = async <T extends DataTypes>(
    queryKey: QueryKey
) => {
    const res = (await api.call(...queryKey)) as SharedStateReturnType<
        DataTypeMap[T]
    >;
    if (res.error !== 0 && res.error !== 404) {
        throw Error(`Shared state error: ${res.error}`);
    }
    return res.data;
};
