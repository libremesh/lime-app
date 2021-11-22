import { h } from 'preact';
import { render } from "utils/test_utils";
import { getPortalConfig } from '../src/piraniaApi';
import { PortalConfigItem } from './PortalConfigItem';
import { fireEvent, screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import queryCache  from 'utils/queryCache';
import { route } from 'preact-router';
import waitForExpect from 'wait-for-expect';

jest.mock('../src/piraniaApi');

describe('portal config item', () => {
    beforeEach(() => {
        getPortalConfig.mockImplementation(async () => ({
            'activated': true,
            'with_vouchers': true, 
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    })

    it('has test id portal-config-item', async() => {
        render(<PortalConfigItem />);
        expect(await screen.findByTestId('portal-config-item')).toBeInTheDocument();
    });

    it('shows value as Activated, with vouchers', async() => {
        render(<PortalConfigItem />);
        expect(await screen.findByText('Activated, with vouchers')).toBeVisible();
    });

    it('shows value as Activated, without vouchers', async() => {
        getPortalConfig.mockImplementation(async () => ({
            'activated': true,
            'with_vouchers': false, 
        }));
        render(<PortalConfigItem />);
        expect(await screen.findByText('Activated, without vouchers')).toBeVisible();
    });

    it('shows value as Deactivated', async() => {
        getPortalConfig.mockImplementation(async () => ({
            'activated': false,
            'with_vouchers': false, 
        }));
        render(<PortalConfigItem />);
        expect(await screen.findByText('Deactivated')).toBeVisible();
    });

    it('routes to portal config page on click', async() => {
        render(<PortalConfigItem />);
        const item = await screen.findByTestId('portal-config-item');
        fireEvent.click(item);
        await waitForExpect(() => {
            expect(route).toBeCalledWith('/nodeadmin/communityPortal');
        })
    })
})
