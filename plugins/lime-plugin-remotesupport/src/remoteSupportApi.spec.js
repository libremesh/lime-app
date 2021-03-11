import { of, throwError } from 'rxjs';
import api from 'utils/uhttpd.service';
import waitForExpect from 'wait-for-expect';

jest.mock('utils/uhttpd.service')

import { getSession, openSession, closeSession } from './remoteSupportApi';


beforeEach(() => {
    api.call.mockClear();
})

describe('getSession', () => {
    it('calls the expected endpoint', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }))
        await getSession();
        expect(api.call).toBeCalledWith('tmate', 'get_session', {});
    })

    it('resolves to session when there is a connected session', async () => {
        const sessionData = {
            rw_ssh: 'ssh -p2222 pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io',
            ro_ssh: 'ssh -p2222 pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io'
        };
        api.call.mockImplementation(() => of(
            {
                status: 'ok',
                session: sessionData,
            }));
        let session = await getSession();
        expect(session).toEqual(sessionData);
    });

    it('resolves to null when there is no session', async () => {
        const sessionData = 'no session';
        api.call.mockImplementation(() => of(
            {
                status: 'ok',
                session: sessionData,
            }));
        let session = await getSession();
        expect(session).toBeNull();
    });

    it('resolves to null when there is a non established session', async () => {
        const sessionData = {
            rw_ssh: "", ro_ssh: ""
        };
        api.call.mockImplementation(() => of(
            {
                status: 'ok',
                session: sessionData,
            }));
        let session = await getSession();
        expect(session).toBeNull();
    });
});

describe('closeSession', () => {
    it('calls the expected endpoint', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }))
        await closeSession();
        expect(api.call).toBeCalledWith('tmate', 'close_session', {})
    })
});

describe('openSession', () => {
    it('calls the expected endpoint', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }))
        await openSession();
        expect(api.call).toBeCalledWith('tmate', 'open_session', {})
    })

    it('resolves to api response on success', async () => {
        api.call.mockImplementation(() => of({ status: 'ok' }));
        const result = await openSession();
        expect(result).toEqual({ status: 'ok'})
    })

    it('rejects to api call error on error', async () => {
        api.call.mockImplementationOnce(() => throwError('timeout'));
        api.call.mockImplementationOnce(() => of({'status': 'ok'}));
        expect.assertions(1);
        try {
            await openSession()
        } catch (e) {
            expect(e).toEqual('timeout')
        }
    })

    it('calls close session when rejected ', async () => {
        api.call.mockImplementationOnce(() => throwError('timeout'));
        api.call.mockImplementationOnce(() => of({'status': 'ok'}));
        expect.assertions(1);
        try {
            await openSession()
        } catch (e) {
            expect(api.call).toBeCalledWith('tmate', 'close_session', {})
        }
    })
});
