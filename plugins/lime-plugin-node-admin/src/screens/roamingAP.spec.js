


import { screen, fireEvent, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import RoamingAPPage from './roamingAP';

import { setupRoamingAP, getAPsData } from '../nodeAdminApi';

jest.mock('../nodeAdminApi');

const findCheckbox = async () =>
    screen.findByLabelText("Enable Community Roaming AP");

const findSubmitButton = async () =>
    screen.findByRole('button', { name: "Save" });

describe('roaming ap config', () => {
    beforeEach(() => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true, ssid: 'QuintanaLibre' } })
        );
        setupRoamingAP.mockImplementation(async () => null);
    });


    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows a text explaining the config', async () => {
        render(<RoamingAPPage />);
        expect(await screen.findByText('Opens the "QuintanaLibre" AP in this node')).toBeVisible();
        expect(await screen.findByText('The Community AP is present in every node allowing people to ' +
        'move around the network territory without losing connection')).toBeVisible();
    });

    it('shows the default value for the community, case disabled', async () => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: false }, enabled: true, ssid: 'QuintanaLibre' } })
        );
        render(<RoamingAPPage />);
        expect(await screen.findByText('It is disabled by default in QuintanaLibre')).toBeVisible();
    });

    it('shows the default value for the community case enabled', async () => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true, ssid: 'QuintanaLibre' } })
        );
        render(<RoamingAPPage />);
        expect(await screen.findByText('It is enabled by default in QuintanaLibre')).toBeVisible();
    });

    it('shows an unchecked switch for enabling the ap when it is disabled in the node', async () => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: false, ssid: 'QuintanaLibre' } })
        );
        render(<RoamingAPPage />);
        expect(await findCheckbox()).not.toBeChecked();
    });

    it('shows a checked switch for enabling the ap when it enabled', async () => {
        render(<RoamingAPPage />);
        expect(await findCheckbox()).toBeChecked();
    });

    it('calls api endpoint for disabling ap when switched off', async () => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: true, ssid: 'QuintanaLibre' } })
        );
        render(<RoamingAPPage />);
        fireEvent.click(await findCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(setupRoamingAP).toBeCalledWith({
                enabled: false
            });
        });
    });

    it('calls api endpoint for disabling ap when switched on', async () => {
        getAPsData.mockImplementation(async () =>
            ({ community_ap: { community: { enabled: true }, enabled: false, ssid: 'QuintanaLibre' } })
        );
        render(<RoamingAPPage />);
        fireEvent.click(await findCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(setupRoamingAP).toBeCalledWith({
                enabled: true
            });
        });
    });
});
