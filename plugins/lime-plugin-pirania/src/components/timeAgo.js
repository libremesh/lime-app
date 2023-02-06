import { useLingui } from "@lingui/react";
import { format, register } from "timeago.js";
import es from "timeago.js/lib/lang/es.js";
import it from "timeago.js/lib/lang/it.js";
import pt from "timeago.js/lib/lang/pt_BR.js";

register("es", es);
register("pt", pt);
register("it", it);

export const TimeAgo = ({ date }) => {
    const { i18n } = useLingui();
    return format(date * 1000, i18n.locale);
};

export default TimeAgo;
