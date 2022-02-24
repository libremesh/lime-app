import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';
import { render, flushPromises } from "utils/test_utils";
import { WellcomeScreenEditor } from './wellcomeScreenEditor.js';
import { getPortalContent, setPortalContent, createCompression } from '../piraniaApi';
import queryCache from 'utils/queryCache';
import userEvent from '@testing-library/user-event';

jest.mock('../piraniaApi');

const INPUT_COMPRESSED_BASE64 = 'data:image/png;base64,compressed...'
const DB_BASE64 = 'data:image/png;base64,input_db...'

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

const fillLinkData = async (url) => {
    const linkTitle = await fillField("Link Title", "Local Community Services");
    const linkURL = await fillField("Link URL", url || "http://quintalibre.org.ar");
    return [linkTitle, linkURL]
};

const fillLogo = async () => {
    const input = await screen.findByLabelText('Community Logo');
    expect(input).toBeInTheDocument();
    const file = selectInputFile(input);
    return file;
};

const defaultContentMock = {
    title: 'mocked title',
    main_text: 'mocked body',
    link_title: 'mocked link title',
    link_url: 'http://mocked_link_url.com',
    logo: DB_BASE64,
    background_color: "#ffffff",
}

describe('portal wellcome screen', () => {
    beforeEach(() => {
        getPortalContent.mockImplementation(async () => defaultContentMock);
        setPortalContent.mockClear();
        setPortalContent.mockImplementation(async () => { });
        createCompression.mockImplementation(async () => INPUT_COMPRESSED_BASE64);
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('shows wellcome screen config title', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByText('Wellcome Screen')).toBeInTheDocument();
    });

    it('shows a thumbnail of the logo', async () => {
        render(<WellcomeScreenEditor />);
        const logo = await screen.findByAltText('logo-preview');
        expect(logo.src).toEqual(DB_BASE64)
    });

    it('shows an input to change the logo that updates thumbnail', async () => {
        render(<WellcomeScreenEditor />);
        const file = await fillLogo();
        await waitForExpect(() => {
            expect(createCompression).toBeCalledWith(file);
            const preview = screen.getByAltText('logo-preview');
            expect(preview.src).toEqual(INPUT_COMPRESSED_BASE64);
        });
    });

    it('shows a loading state for thumbnail and disables submit while compressing', async () => {
        createCompression.mockImplementation(() =>
            new Promise((res) => {
                setTimeout(() => {
                    res(DB_BASE64);
                }, 2000);
            }));
        render(<WellcomeScreenEditor />);
        await fillLogo();
        expect(await screen.findByTestId('loading')).toBeInTheDocument();
        expect(await findSubmitButton()).toBeDisabled();
        act(() => {
            jest.advanceTimersByTime(2000);
        });
		await flushPromises();
        expect(screen.queryByTestId('loading')).toBeNull();
        expect(await findSubmitButton()).toBeEnabled();
    });

    it('shows a text input for title', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByLabelText('Title')).toBeInTheDocument();
    });

    it('shows a text area input for main text', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByLabelText('Main Text')).toBeInTheDocument();
    });

    it('shows a color input for background color', async () => {
        render(<WellcomeScreenEditor />);
        expect(await screen.findByLabelText('Background Color')).toBeInTheDocument();
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

    it('submits existent data when clicking submit button', async () => {
        render(<WellcomeScreenEditor />);
        const button = await findSubmitButton();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalContent).toBeCalledWith(defaultContentMock);
        });
        expect(await screen.findByText('Saved')).toBeInTheDocument();
    });

    it('submits all data when clicking submit button', async () => {
        render(<WellcomeScreenEditor />);
        const title = await fillTitle();
        const mainText = await fillMainText();
        const [linkTitle, linkURL] = await fillLinkData();
        await fillLogo();
        await waitForExpect(() => {
            expect(screen.getByRole('button', { name: "Save" })).toBeEnabled();
        });
        fireEvent.click(screen.getByRole('button', { name: "Save" }));
        await waitForExpect(() => {
            expect(setPortalContent).toBeCalledWith(
                {
                    title,
                    background_color: "#ffffff",
                    main_text: mainText,
                    link_title: linkTitle,
                    link_url: linkURL,
                    logo: INPUT_COMPRESSED_BASE64
                }
            )
        });
        expect(await screen.findByText('Saved')).toBeInTheDocument();
    });

    it('shows an error message if submition fails', async () => {
        setPortalContent.mockImplementation(async () => Promise.reject());
        render(<WellcomeScreenEditor />);
        await fillTitle();
        await fillMainText();
        await fillLinkData();
        await fillLogo();
        await waitForExpect(() => {
            expect(screen.getByRole('button', { name: "Save" })).toBeEnabled();
        });
        const submitButton = await findSubmitButton();
        fireEvent.click(submitButton);
        expect(await screen.findByText('Error: Not Saved')).toBeInTheDocument();
    });

    it('shows an error if link url doesnt start with http or https', async() => {
        render(<WellcomeScreenEditor />);
        await fillLinkData('mysite.com');
        const submitButton = await findSubmitButton();
        fireEvent.click(submitButton);
        expect(await screen.findByText('It must start with https:// or http://')).toBeInTheDocument();
    });
});
