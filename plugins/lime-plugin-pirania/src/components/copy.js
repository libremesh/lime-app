import { createRef } from "preact";
import { useState } from "preact/hooks";

function selectText(node) {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

const Copy = ({ text, className }) => {
    const [isCopied, setIsCopied] = useState(false);
    const ref = createRef();

    async function copyTextToClipboard() {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(ref.current.innerText);
        }
        // clipboard API works only on https sites
        selectText(ref.current.firstChild);
        return document.execCommand("copy");
    }

    const handleCopyClick = (e) => {
        // Asynchronously call copyTextToClipboard
        e.stopPropagation();

        return copyTextToClipboard().then(() => {
            // If successful, update the isCopied state value
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 500);
        });
    };

    return (
        <div class={className}>
            <div onClick={handleCopyClick}>
                <span ref={ref} style={{ marginRight: 10, cursor: "pointer" }}>
                    {text}
                </span>
                <span
                    style={{ cursor: "pointer", opacity: isCopied ? 0.3 : 1 }}
                >
                    ⧉
                </span>
            </div>
        </div>
    );
};
export default Copy;
