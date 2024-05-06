import api from "utils/uhttpd.service";

import { closeSession, getSession, openSession } from "./remoteSupportApi";

jest.mock("utils/uhttpd.service");

beforeEach(() => {
    api.call.mockClear();
    api.call.mockImplementation(async () => ({ status: "ok" }));
});

describe("getSession", () => {
    it("calls the expected endpoint", async () => {
        await getSession();
        expect(api.call).toHaveBeenCalledWith("tmate", "get_session", {});
    });

    it("resolves to session when there is a connected session", async () => {
        const sessionData = {
            rw_ssh: "ssh -p2222 pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io",
            ro_ssh: "ssh -p2222 pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io",
        };
        api.call.mockImplementation(async () => ({
            status: "ok",
            session: sessionData,
        }));
        let session = await getSession();
        expect(session).toEqual(sessionData);
    });

    it("resolves to null when there is no session", async () => {
        const sessionData = "no session";
        api.call.mockImplementation(async () => ({
            status: "ok",
            session: sessionData,
        }));
        let session = await getSession();
        expect(session).toBeNull();
    });

    it("resolves to null when there is a non established session", async () => {
        const sessionData = {
            rw_ssh: "",
            ro_ssh: "",
        };
        api.call.mockImplementation(async () => ({
            status: "ok",
            session: sessionData,
        }));
        let session = await getSession();
        expect(session).toBeNull();
    });
});

describe("closeSession", () => {
    it("calls the expected endpoint", async () => {
        await closeSession();
        expect(api.call).toHaveBeenCalledWith("tmate", "close_session", {});
    });
});

describe("openSession", () => {
    it("calls the expected endpoint", async () => {
        await openSession();
        expect(api.call).toHaveBeenCalledWith("tmate", "open_session", {});
    });

    it("resolves to api response on success", async () => {
        const result = await openSession();
        expect(result).toEqual({ status: "ok" });
    });

    it("rejects to api call error on error", async () => {
        api.call.mockImplementationOnce(async () => Promise.reject("timeout"));
        api.call.mockImplementationOnce(async () => ({ status: "ok" }));
        expect.assertions(1);
        await expect(openSession()).rejects.toEqual("timeout");
    });

    it("calls close session when rejected", async () => {
        api.call.mockImplementationOnce(() => Promise.reject("timeout"));
        api.call.mockImplementationOnce(async () => ({ status: "ok" }));
        expect.assertions(2);
        await expect(openSession()).rejects.toEqual("timeout");
        expect(api.call).toHaveBeenCalledWith("tmate", "close_session", {});
    });
});
