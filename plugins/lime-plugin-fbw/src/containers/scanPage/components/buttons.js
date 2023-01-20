import { Trans } from '@lingui/macro';



export const RescanButton = ({rescan}) => {
    return (
        <button
            onClick={rescan}
            class="u-full-width"
        >
            <Trans>Rescan</Trans>
        </button>
    )
}

export const CancelButton = ({cancel}) => {
    return (
        <button
            onClick={cancel}
            class="u-full-width"
        >
            <Trans>Cancel</Trans>
        </button>
    )
}

export const BackButton = ({goBack}) => {
    return (
        <button
            onClick={goBack}
            class="u-full-width"
        >
            <Trans>Back</Trans>
        </button>
    )
}
