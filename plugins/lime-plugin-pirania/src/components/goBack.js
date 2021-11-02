import { h } from "preact";
import { route } from "preact-router";

const GoBack = ({ url }) => (
	<img
		style={{ cursor: "pointer" }}
		onClick={() => route(url)}
		src={
			"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDdIMy44M0w5LjQyIDEuNDFMOCAwTDAgOEw4IDE2TDkuNDEgMTQuNTlMMy44MyA5SDE2VjdaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjU0Ii8+Cjwvc3ZnPgo="
		}
	/>
);
export default GoBack;
