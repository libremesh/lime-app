import api from "utils/uhttpd.service";

export const scanStart = () => api.call("lime-fbw", "start", {});

export const scanStop = () => api.call("lime-fbw", "stop", {});

export const scanRestart = () => api.call("lime-fbw", "restart", {});

export const setNetwork = ({ file, hostname }) =>
    api.call("lime-fbw", "set_network", { file, hostname });

export const createNetwork = ({ network, hostname, adminPassword }) =>
    api.call("lime-fbw", "create_network", {
        network,
        hostname,
        adminPassword,
    });

export const getStatus = () =>
    api.call("lime-fbw", "status", {}).catch(() => ({ lock: false }));

export const dismissFbw = () => api.call("lime-fbw", "dismiss", {});
