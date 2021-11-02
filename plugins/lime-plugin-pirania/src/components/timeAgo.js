import * as timeago from "timeago.js";

const timeAgo = ({ date }) => timeago.format(new Date(date * 1000));
export default timeAgo;
