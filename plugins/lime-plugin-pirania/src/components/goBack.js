import { route } from "preact-router";

const GoBack = ({ url }) => (
    <div className="clickable" aria-label="back" onClick={() => route(url)}>
        ❮
    </div>
);
export default GoBack;
