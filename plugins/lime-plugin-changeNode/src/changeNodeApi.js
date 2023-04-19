import { map } from "rxjs/operators";

export const getCloudNodes = (api) =>
    api.call("lime-utils", "get_cloud_nodes", {}).pipe(
        map((x) => x.nodes),
        map((data) =>
            Object.keys(data)
                .map((key) => data[key])
                .reduce((x, y) => x.concat(y), [])
        )
    );
