import { h } from "preact";
import { route } from "preact-router";

const GoBack = ({ url }) => (
	<span
		style={{ cursor: "pointer", fontSize: 50 }}
		onClick={() => route(url)}
	>🠔</span>
);
export default GoBack;
