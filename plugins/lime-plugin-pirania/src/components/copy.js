import { h } from "preact";
import { useState } from "react";

const GoBack = ({ text, style }) => {
	const [isCopied, setIsCopied] = useState(false);
	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		}

		return document.execCommand("copy", true, text);

	}
	const handleCopyClick = () => {
		// Asynchronously call copyTextToClipboard
		copyTextToClipboard(text)
			.then(() => {
				// If successful, update the isCopied state value
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			})
	};
	return (
		<div style={style}>
			<div onClick={handleCopyClick}>
				<span style={{ marginRight: 10, cursor: "pointer" }}>{text}</span>
				<img
					height="15"
					style={{ cursor: "pointer", opacity: isCopied ? 0.3 : 1 }}
					src={
						"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgZGF0YS1uYW1lPSJMYXllciAxIgogICB2aWV3Qm94PSIwIDAgNTcgNjAiCiAgIHg9IjBweCIKICAgeT0iMHB4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc5MjIiCiAgIHNvZGlwb2RpOmRvY25hbWU9Im5vdW5fY29weV80MDM5NDQ1LnN2ZyIKICAgd2lkdGg9IjU3IgogICBoZWlnaHQ9IjYwIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEuMSAoM2JmNWFlMGQyNSwgMjAyMS0wOS0yMCkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczkyNiIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzkyNCIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiNjY2NjY2MiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjguOTUiCiAgICAgaW5rc2NhcGU6Y3g9IjMxLjk1NTMwNyIKICAgICBpbmtzY2FwZTpjeT0iMTguNTQ3NDg2IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE1IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnOTIyIiAvPgogIDxwYXRoCiAgICAgZD0iTSA0Mi41Niw1NS41NyBIIDEzLjYzIGEgMy41LDMuNSAwIDAgMSAtMy41LC0zLjUgViAyMC4yMiBhIDMuNSwzLjUgMCAwIDEgMy41LC0zLjUgaCAyOC45MyBhIDMuNSwzLjUgMCAwIDEgMy41LDMuNSB2IDMxLjg1IGEgMy41LDMuNSAwIDAgMSAtMy41LDMuNSB6IE0gMTMuNjMsMTguNzIgYSAxLjUsMS41IDAgMCAwIC0xLjUsMS41IHYgMzEuODUgYSAxLjUsMS41IDAgMCAwIDEuNSwxLjUgaCAyOC45MyBhIDEuNSwxLjUgMCAwIDAgMS41LC0xLjUgViAyMC4yMiBhIDEuNSwxLjUgMCAwIDAgLTEuNSwtMS41IHoiCiAgICAgaWQ9InBhdGg5MTQiIC8+CiAgPHBhdGgKICAgICBkPSJtIDQ5LjU0LDQ3LjI4IGggLTEuMTUgdiAtMiBoIDEuMTUgYSAyLjUyLDIuNTIgMCAwIDAgMi4zMywtMi42NiBWIDEzLjA5IEEgMi41MiwyLjUyIDAgMCAwIDQ5LjU0LDEwLjQzIEggMjIuNjggYSAyLjUyLDIuNTIgMCAwIDAgLTIuMzMsMi42NiB2IDEuMTQgaCAtMiB2IC0xLjE0IGEgNC41MSw0LjUxIDAgMCAxIDQuMzMsLTQuNjYgaCAyNi44NiBhIDQuNTEsNC41MSAwIDAgMSA0LjMzLDQuNjYgdiAyOS41MyBhIDQuNTEsNC41MSAwIDAgMSAtNC4zMyw0LjY2IHoiCiAgICAgaWQ9InBhdGg5MTYiIC8+Cjwvc3ZnPgo="
					}
				/>
			</div>
		</div>
	);
};
export default GoBack;
