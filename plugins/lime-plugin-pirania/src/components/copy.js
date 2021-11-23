import { h } from "preact";
import { useState } from "react";

const Copy = ({ text, className }) => {
	const [isCopied, setIsCopied] = useState(false);
	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		}

		return document.execCommand("copy", true, text);

	}
	const handleCopyClick = (e) => {
		// Asynchronously call copyTextToClipboard
		e.stopPropagation();
		copyTextToClipboard(text)
			.then(() => {
				// If successful, update the isCopied state value
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 500);
			})
	};
	return (
		<div class={className} >
			<div onClick={handleCopyClick}>
				<span style={{ marginRight: 10, cursor: "pointer" }}>{text}</span>
				<span style={{ cursor: "pointer", opacity: isCopied ? 0.3 : 1 }}>⧉</span>
			</div>
		</div>
	);
};
export default Copy;
