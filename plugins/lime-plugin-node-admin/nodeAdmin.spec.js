import { h } from 'preact';
import { fireEvent, screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import NodeAdmin from './src/nodeAdminPage';
import { getWifiData } from './src/nodeAdminApi';
import { getBoardData } from 'utils/api';
import { route } from 'preact-router';

jest.mock('./src/nodeAdminApi');
jest.mock('utils/api');

describe('nodeAdmin', () => {
    beforeEach(() => {
        getWifiData.mockImplementation(async () => ({
            ap_name: { has_password: false }
        }));
        getBoardData.mockImplementation(async () => ({
            hostname: 'node-hostname'
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows hostname config', async() => {
        render(<NodeAdmin />);
        expect(await screen.findByText('Node Name')).toBeInTheDocument();
        expect(await screen.findByText('node-hostname')).toBeInTheDocument();
    });

    it('routes to hostname config screen when clicking on hostname', async() => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText('node-hostname'));
        expect(route).toHaveBeenCalledWith('nodeadmin/hostname');
    });

    it('shows wifi config when no password', async() => {
        render(<NodeAdmin />);
        expect(await screen.findByText('Wifi Password')).toBeInTheDocument();
        expect(await screen.findByText('No password')).toBeInTheDocument();
    });

    it('shows wifi config whit password', async() => {
        getWifiData.mockImplementation(async () => ({
            ap_name: {has_password: true}
        }));
        render(<NodeAdmin />);
        expect(await screen.findByText('Wifi Password')).toBeInTheDocument();
        expect(await screen.findByText('********')).toBeInTheDocument();
    });

    it('routes to password wifi config screen when clicking on wifi', async() => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText('Wifi Password'));
        expect(route).toHaveBeenCalledWith('nodeadmin/wifipassword');
    });
});
