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
				<span style={{ cursor: "pointer", opacity: isCopied ? 0.3 : 1 }}>⧉</span>
			</div>
		</div>
	);
};
export default GoBack;
