import { h } from "preact";
import { route } from "preact-router";

const GoBack = ({ url }) => (
    <div class="clickable" aria-label="back" onClick={() => route(url)}>
        ❮
    </div>
);
export default GoBack;
