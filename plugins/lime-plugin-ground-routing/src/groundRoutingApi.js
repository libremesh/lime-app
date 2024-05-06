import { map } from "rxjs/operators";

export const getGroundRouting = (api, sid) =>
    api.call(sid, "lime-groundrouting", "get", {}).pipe(
        map((x) => {
            if (typeof x.config === "undefined") {
                throw { error: true };
            }
            return x;
        })
    );

export const setGroundRouting = (api, sid, config) =>
    api.call(sid, "lime-groundrouting", "set", config);
