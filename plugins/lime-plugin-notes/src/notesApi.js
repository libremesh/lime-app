import { map } from "rxjs/operators";

export const getNotes = (api) =>
    api.call("lime-utils", "get_notes", {}).pipe(
        map((x) => {
            if (typeof x.notes === "undefined") {
                throw { error: true };
            }
            return x;
        })
    );

export const setNotes = (api, notes) =>
    api.call("lime-utils", "set_notes", notes);
