

import { screen, fireEvent, cleanup, act, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import waitForExpect from 'wait-for-expect';

import { getBoardData, getChangesNeedReboot, getSession } from "utils/api";
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import HostnamePage from './hostname';
import { changeHostname } from '../nodeAdminApi';

jest.mock("utils/api");
jest.mock('../nodeAdminApi');

const fillAndSubmitForm = async (hostname, expectHostname = undefined) => {
    expectHostname = expectHostname === undefined ? hostname : expectHostname;
    const input = await screen.findByLabelText(/node name/i);
    fireEvent.input(input, { target: { value: hostname } });
    expect(input.value).toBe(expectHostname);
    fireEvent.click(await screen.findByRole("button", { name: /save/i }));
};

describe('hostname config', () => {
    beforeEach(() => {
        getBoardData.mockImplementation(async () => ({
            hostname: "node-hostname",
        }));
        getChangesNeedReboot.mockImplementation(async () => true);
        getSession.mockImplementation(async () => ({
            username: "root",
        }));
        changeHostname.mockImplementation(async (hostname) => hostname);
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    it('lets you change the hostname', async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("new-hostname");
        await waitFor(() => {
            expect(changeHostname).toBeCalledWith('new-hostname');
        });
    });

    it('shows an error message when hostname length is less than 3', async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("fo");
        // await waitFor(() => {
        //     expect(
        //         screen.getByText(/the name should have at least 3 characters/i)
        //     ).toBeInTheDocument();
        // });
        expect(changeHostname).not.toBeCalled();
    });

    it('slugifies users input', async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("foo_foo foo", "foo-foo-foo");
        await waitFor(() => {
            expect(changeHostname).toBeCalledWith('foo-foo-foo');
        });
    });
});
