
import { h } from 'preact';

import { screen, fireEvent, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { render } from 'utils/test_utils';
import { route } from 'preact-router';
import ConfigPageLayout from './configPageLayout';

const findBackArrow = async () =>
    screen.findByLabelText('back');


describe('config layout', () => {
    it('renders the title for the config', async() => {
        render(<ConfigPageLayout title={"My Config"} />);
        expect(await screen.findByText('My Config'));
    });

    it('routes back to node admin when clicking on back arrow', async() => {
        render(<ConfigPageLayout />);
        fireEvent.click(await findBackArrow());
        expect(route).toBeCalledWith('/nodeadmin');
    });

    it('shows a message on errors', async() => {
        render(<ConfigPageLayout isError={true} />);
        expect(await screen.findByText('Error: Not Saved')).toBeInTheDocument();
    });

    it('shows a message on success', async() => {
        render(<ConfigPageLayout isSuccess={true} />);
        expect(await screen.findByText('Saved')).toBeInTheDocument();
    });
});
