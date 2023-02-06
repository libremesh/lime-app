import { Trans } from "@lingui/macro";

export const ChangeNodeMenu = () => (
    <span>
        <svg
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
        >
            <path
                d="M1.5 10.5V10H1v.5h.5zm12 0h.5V10h-.5v.5zm0 5v.5h.5v-.5h-.5zm-12 0H1v.5h.5v-.5zm1.72-8.339C4.373 5.761 5.916 5 7.5 5V4c-1.917 0-3.732.924-5.052 2.525l.771.636zM7.5 5c1.583 0 3.126.762 4.281 2.161l.771-.636C11.232 4.924 9.417 4 7.5 4v1zm-6.614.318C2.659 3.168 5.042 1.985 7.5 1.985v-1C4.707.985 2.054 2.331.114 4.682l.772.636zM7.5 1.985c2.458 0 4.84 1.183 6.614 3.333l.772-.636C12.946 2.33 10.293.985 7.5.985v1zM7 7v3h1V7H7zm-5.5 4h12v-1h-12v1zm11.5-.5v5h1v-5h-1zm.5 4.5h-12v1h12v-1zM2 15.5v-5H1v5h1z"
                fill="currentColor"
            />
        </svg>
        <a href={"#/changenode"}>
            <Trans>Visit a neighboring node</Trans>
        </a>
    </span>
);
