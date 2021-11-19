import { h } from 'preact';
import { fireEvent, act, screen} from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';
import { render } from "utils/test_utils";
import { WellcomeScreenEditor } from './wellcomeScreenEditor.js';
import { getPortalContent, setPortalContent, createCompression } from '../piraniaApi';
import queryCache from 'utils/queryCache';
import userEvent from '@testing-library/user-event';

jest.mock('../piraniaApi');

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

const selectInputFile = (inputElem) => {
    const file = new File(['(⌐□_□)'], 'our_logo.png');
    userEvent.upload(inputElem, file)
    return file;
}

const fillField = async (fieldLabel, value) => {
    fireEvent.input(
        await screen.findByLabelText(fieldLabel),
        { target: { value } }
    );
    return value
}
const fillTitle = async () => await fillField(
    "Title",
    "Wellcome to QuintanaLibre"
);

const fillMainText = async () => await fillField(
    "Main Text",
    "This is a commmunity network self organized by it's members."
);

const fillLinkData = async () => {
    const linkTitle = await fillField("Link Title", "Local Community Services");
    const linkURL = await fillField("Link URL", "http://quintalibre.org.ar");
    return [linkTitle, linkURL]
};

const fillLogo = async () => {
    const input = await screen.findByLabelText('Community Logo');
    expect(input).toBeInTheDocument();
    const file = selectInputFile(input);
    return await getBase64(file);
};

const getBase64 = (file) => new Promise(res => {
    const reader = new FileReader();
    reader.onloadend = function () {
        res(reader.result);
    }
    reader.readAsDataURL(file);
});

const defaultContentMock = {
    title: 'mocked title',
    body: 'mocked body',
    link_title: 'mocked link title',
    link_url: 'mocked_link_url.com',
    logo: 'data:image/png;base64,iVBOR...w0Kv='
}

describe('portal wellcome screen', () => {
    beforeEach(() => {
        getPortalContent.mockImplementation(async () => defaultContentMock);
        setPortalContent.mockImplementation(async () => { });
        createCompression.mockImplementation(async (file) => await getBase64(file));
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    it('shows wellcome screen config title', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByText('Wellcome Screen')).toBeInTheDocument();
    });

    it('shows a thumbnail of the logo', async () => {
        render(<WellcomeScreenEditor />);
        const logo = await screen.findByAltText('logo-preview');
        expect(logo.src).toEqual(defaultContentMock.logo)
    });

    it('shows an input to change the logo that updates thumbnail', async () => {
        render(<WellcomeScreenEditor />);
        const base64 = await fillLogo();
        await waitForExpect(() => {
            const preview = screen.getByAltText('logo-preview');
            expect(preview.src).toEqual(base64);
        })
    });

    it('shows a text input for title', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByLabelText('Title')).toBeInTheDocument();
    });

    it('shows a text area input for main text', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByLabelText('Main Text')).toBeInTheDocument();
    });

    it('shows an optional dual input for link title and url', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByText(
            'If your community network has local services, ' +
            'you can point a link to them.'
        )).toBeInTheDocument();
        expect(await screen.findByLabelText('Link Title')).toBeInTheDocument();
        expect(await screen.findByLabelText('Link URL')).toBeInTheDocument();
    });

    it('shows a button to submit content', async () => {
        render(<WellcomeScreenEditor />);
        expect(await findSubmitButton()).toBeInTheDocument();
    });

    it('submits all data when clicking submit button', async () => {
        render(<WellcomeScreenEditor />);
        const title = await fillTitle();
        const mainText = await fillMainText();
        const [linkTitle, linkURL] = await fillLinkData();
        const logoBase64 = await fillLogo();
        await waitForExpect(() => {
            expect(screen.getByRole('button', { name: "Save" })).toBeEnabled();
        });
        fireEvent.click(screen.getByRole('button', { name: "Save" }));
        await waitForExpect(() => {
            expect(setPortalContent).toBeCalledWith(
                {
                    title,
                    main_text: mainText,
                    link_title: linkTitle,
                    link_url: linkURL,
                    logo: logoBase64
                }
            )
        });
        expect(await screen.findByText('Saved')).toBeInTheDocument();
    });

    it('shows an error message if submition fails', async () => {
        setPortalContent.mockImplementation(async () => Promise.reject());
        render(<WellcomeScreenEditor />);
        const title = await fillTitle();
        const mainText = await fillMainText();
        const [linkTitle, linkURL] = await fillLinkData();
        const logoBase64 = await fillLogo();
        const submitButton = await findSubmitButton();
        fireEvent.click(submitButton);
        expect(await screen.findByText('Error: Not Saved')).toBeInTheDocument();
    });
});
