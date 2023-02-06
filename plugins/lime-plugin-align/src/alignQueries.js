import { useQuery } from "@tanstack/react-query";

import { getAssocList, getMeshIfaces } from "./alignApi";
import { markAssociated, sortBySignal } from "./utils";

export function useMeshIfaces(queryConfig) {
    return useQuery(
        ["lime-utils", "get_mesh_ifaces"],
        getMeshIfaces,
        queryConfig
    );
}

async function _getAssocList(iface) {
    let assoclist = await getAssocList(iface);
    assoclist = sortBySignal(assoclist);
    assoclist = markAssociated(assoclist);
    return assoclist;
}

export function useAssocList(iface, queryConfig) {
    return useQuery(
        ["iwinfo", "assoclist", iface],
        async () => await _getAssocList(iface),
        queryConfig
    );
}
