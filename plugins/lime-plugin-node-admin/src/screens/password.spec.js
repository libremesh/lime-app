
import { h } from 'preact';

import { screen, fireEvent, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import APPasswordPage from './password';
import { changeApNamePassword, getAdminApsData } from '../nodeAdminApi';

jest.mock('../nodeAdminApi');

const withoutPasswordMock = async () => ({
    node_ap: { password: "", has_password: false }
});

const withPasswordMock = async () => ({
    node_ap: { password: "some-password", has_password: true }
});

const findPasswordUsageCheckbox = async () =>
    screen.findByLabelText("Enable Password");

const findPasswordInput = async () =>
    screen.findByLabelText("Wifi Password");

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

describe('ap password config', () => {
    beforeEach(() => {
        // getChangesNeedReboot.mockImplementation(false);
        getAdminApsData.mockImplementation(withoutPasswordMock);
        changeApNamePassword.mockClear();
        changeApNamePassword.mockImplementation(async () => null);
    });


    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows a button to submit password config', async () => {
        render(<APPasswordPage />);
        expect(await findSubmitButton()).toBeVisible();
    });

    it('shows an unchecked switch for password usage when password is disabled', async () => {
        render(<APPasswordPage />);
        expect(await findPasswordUsageCheckbox()).not.toBeChecked();
    });

    it('doesnt show an input for password when password is disabled', async () => {
        render(<APPasswordPage />);
        expect(screen.queryByLabelText("Wifi Password")).toBeNull();
    });
    it('shows a checked switch for password usage when password is enabled', async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        expect(await findPasswordUsageCheckbox()).toBeChecked();
    });

    it('shows password input with current password when password is enabled', async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        expect(await findPasswordInput()).toBeVisible();
    });

    it('shows password input when password usage is switched on', async () => {
        render(<APPasswordPage />);
        fireEvent.click(await findPasswordUsageCheckbox());
        await waitForExpect(async () => {
            expect(await findPasswordInput()).toBeVisible();
        });
    });

    it('hides password input when password usage is switched off', async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        fireEvent.click(await findPasswordUsageCheckbox());
        expect(screen.queryByLabelText("Wifi Password")).toBeNull();
    });


    it('calls api endpoint for disabling password when switched off', async () => {
        render(<APPasswordPage />);
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(changeApNamePassword).toBeCalledWith({
                password: "", enablePassword: false
            });
        });
        expect(await screen.findByTestId('changes-need-reboot')).toBeVisible();
    });

    it('calls api endpoint for enabling password when switched on', async () => {
        render(<APPasswordPage />);
        fireEvent.click(await findPasswordUsageCheckbox());
        fireEvent.input(await findPasswordInput(),
            { target: { value: "12345678" } });
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(changeApNamePassword).toBeCalledWith({
                password: "12345678", enablePassword: true
            });
        });
        expect(await screen.findByTestId('changes-need-reboot')).toBeVisible();
    });

    it('shows an error if password usage is switched on but password is to short', async () => {
        render(<APPasswordPage />);
        fireEvent.click(await findPasswordUsageCheckbox());
        fireEvent.input(await findPasswordInput(),
            { target: { value: "1234567" } });
        fireEvent.click(await findSubmitButton());
        expect(
            await screen.findByText("The password should have at least 8 characters")
        ).toBeVisible();
        expect(changeApNamePassword).not.toBeCalled();
    });
});
