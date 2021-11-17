import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';
import { render } from "utils/test_utils";
import { PortalConfigPage } from './PortalConfigPage';
import { getPortalConfig, setPortalConfig } from '../src/piraniaApi';
import queryCache from 'utils/queryCache';

jest.mock('../src/piraniaApi');

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

const findActiveCheckbox = async () =>
    screen.findByLabelText("Activate Portal in Community AP");

describe('portal config page', () => {
    beforeEach(() => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true, with_vouchers: true
        }));
        setPortalConfig.mockImplementation(async () => {});
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    it('shows community portal title', async () => {
        render(<PortalConfigPage />);
        expect(await screen.findByText('Community Portal')).toBeVisible();
    });

    it('shows a button to submit config', async () => {
        render(<PortalConfigPage />);
        expect(await findSubmitButton()).toBeVisible();
    });

    it('shows an unchecked switch for portal activation when deactivated', async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: false
        }));
        render(<PortalConfigPage />);
        expect(await findActiveCheckbox()).not.toBeChecked();
    });

    it('shows a checked switch for portal activation when activated', async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true
        }));
        render(<PortalConfigPage />);
        expect(await findActiveCheckbox()).toBeChecked();
    });


    it('calls setPortalConfig on submit', async () => {
        render(<PortalConfigPage />);
        const button = await findSubmitButton();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': true
            });
        });
        fireEvent.click(await findActiveCheckbox());
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': false
            });
        });
    });
});
