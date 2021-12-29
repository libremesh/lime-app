import { h } from 'preact';
import { fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';
import { render } from "utils/test_utils";
import { PortalConfigPage } from './PortalConfigPage';
import { getPortalConfig, setPortalConfig } from '../src/piraniaApi';
import { route } from 'preact-router';
import queryCache from 'utils/queryCache';

jest.mock('../src/piraniaApi');

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

const findActiveCheckbox = async () =>
    screen.findByLabelText("Activate Portal in Community AP");

const findVouchersCheckbox = async () =>
    screen.findByLabelText("Use vouchers for access");

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

    it('has a link for wellcome screen editor', async () => {
        render(<PortalConfigPage />);
        const link = await screen.findByRole('link', {name: 'Edit wellcome screen'});
        expect(link).toBeInTheDocument();
        fireEvent.click(link);
        await waitForExpect(() => {
            expect(route).toBeCalledWith('/access/wellcomescreen');
        });
    })
    it('shows an unchecked switch for vouchers usage when not activated', async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true, with_vouchers: false
        }));
        render(<PortalConfigPage />);
        expect(await findVouchersCheckbox()).not.toBeChecked();
    });

    it('shows an checked switch for vouchers usage when activated', async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true, with_vouchers: true
        }));
        render(<PortalConfigPage />);
        expect(await findVouchersCheckbox()).toBeChecked();
    });


    it('calls setPortalConfig on submit', async () => {
        render(<PortalConfigPage />);
        const button = await findSubmitButton();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': true, 'with_vouchers': true
            });
        });
        fireEvent.click(await findActiveCheckbox());
        fireEvent.click(await findVouchersCheckbox());
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': false, 'with_vouchers': false
            });
        });
        fireEvent.click(await findActiveCheckbox());
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': true, 'with_vouchers': false
            });
        });
        fireEvent.click(await findActiveCheckbox());
        fireEvent.click(await findVouchersCheckbox());
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(setPortalConfig).toBeCalledWith({
                'activated': false, 'with_vouchers': true
            });
        });
    });

    it('has a link to pirania vouchers admin page', async () => {
        render(<PortalConfigPage />);
        const link = await (screen.findByText('Manage Vouchers'));
        expect(link).toBeVisible();
        fireEvent.click(link);
        await waitForExpect(() => {
            expect(route).toBeCalledWith('/access')
        })
    });
});
