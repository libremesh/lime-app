import api from "utils/uhttpd.service";

export const getLocation =
    // async (api) => mockGetLocation;
    () => api.call("lime-location", "get", {});

export const getNodesandlinks = async (api) => mockNodeLinks;
// api.call("lime-location", "all_nodes_and_links", {});

export const changeLocation = async (location) => {
    return await api.call("lime-location", "set", {
        lat: location.lat.toFixed(5),
        lon: location.lon.toFixed(5),
    });
};

const mockGetLocation = {
    location: {
        lon: "-64.40186",
        lat: "-31.71240",
    },
    default: false,
    status: "ok",
};

// const mockGetLocation = {
//     location: {
//         lon: "FIXME",
//         lat: "FIXME",
//     },
//     default: true,
//     status: "ok",
// };

const mockNodeLinks = {
    result: {
        "si-radio": {
            bleachTTL: 20,
            data: {
                links: [
                    "64:66:b3:87:4e:d1",
                    "64:70:02:4e:cd:0b",
                    "14:cc:20:ad:b0:d9",
                    "a8:40:41:1c:83:eb",
                    "a8:40:41:1d:f9:26",
                ],
                coordinates: {
                    lon: "-64.39240",
                    lat: "-31.82056",
                },
                macs: [
                    "aa:40:41:1c:85:50",
                    "02:cc:4e:1c:85:52",
                    "a8:40:41:1c:84:1a",
                    "a8:40:41:1c:85:50",
                    "02:58:47:1c:85:52",
                    "ae:40:41:1c:85:50",
                    "02:ab:46:1c:85:52",
                    "a8:40:41:1c:84:16",
                ],
                hostname: "si-radio",
            },
            author: "si-radio",
        },
        "ql-berta": {
            bleachTTL: 27,
            data: {
                hostname: "ql-berta",
                coordinates: {
                    lon: "-64.41609",
                    lat: "-31.80461",
                },
                macs: [
                    "a8:40:41:1d:fa:29",
                    "aa:40:41:1f:71:60",
                    "a8:40:41:1f:71:60",
                    "a8:40:41:1d:f9:f2",
                    "02:cc:4e:1f:71:62",
                    "02:ab:46:1f:71:62",
                ],
                links: ["a8:40:41:1c:83:f8"],
            },
            author: "ql-berta",
        },
        "ql-esteban": {
            bleachTTL: 23,
            data: {
                links: ["", ""],
                coordinates: {
                    lon: "-64.41600680351257",
                    lat: "-31.801688993108318",
                },
                macs: [
                    "a0:f3:c1:48:cf:ec",
                    "a0:f3:c1:48:cf:ed",
                    "a2:f3:c1:48:cf:ec",
                    "a2:f3:c1:48:cf:ed",
                ],
                hostname: "ql-esteban",
            },
            author: "ql-esteban",
        },
        "ql-irenecasa": {
            bleachTTL: 23,
            data: {
                links: ["64:66:b3:87:4b:38", "64:66:b3:87:4b:39"],
                coordinates: {
                    lon: "-64.41609",
                    lat: "-31.80461",
                },
                macs: [
                    "66:70:02:4e:cc:e2",
                    "02:ab:46:4e:cc:e1",
                    "64:70:02:4e:cc:e2",
                    "62:70:02:4e:cc:e2",
                    "64:70:02:4e:cc:e3",
                    "02:58:47:4e:cc:e1",
                ],
                hostname: "ql-irenecasa",
            },
            author: "ql-irenecasa",
        },
        "ql-czuk-bbone": {
            bleachTTL: 27,
            data: {
                links: ["a8:40:41:1c:84:20", "a8:40:41:1c:83:dd"],
                coordinates: {
                    lon: "-64.41515",
                    lat: "-31.80130",
                },
                macs: [
                    "a8:40:41:1d:f8:5c",
                    "a8:40:41:1d:2a:a0",
                    "02:cc:4e:1d:2a:a2",
                    "aa:40:41:1d:f8:5c",
                    "a8:40:41:1c:86:73",
                    "aa:40:41:1c:86:73",
                    "02:ab:46:1d:2a:a2",
                ],
                hostname: "ql-czuk-bbone",
            },
            author: "ql-czuk-bbone",
        },
        "ql-irene": {
            bleachTTL: 23,
            data: {
                links: [
                    "64:70:02:4e:cc:e2",
                    "64:70:02:4e:cc:e3",
                    "a2:f3:c1:48:cf:ed",
                    "a8:40:41:1c:86:96",
                ],
                coordinates: {
                    lon: "-64.41682",
                    lat: "-31.80584",
                },
                macs: [
                    "02:ab:46:87:4b:37",
                    "66:66:b3:87:4b:38",
                    "02:58:47:87:4b:37",
                    "64:66:b3:87:4b:38",
                    "64:66:b3:87:4b:39",
                    "62:66:b3:87:4b:38",
                ],
                hostname: "ql-irene",
            },
            author: "ql-irene",
        },
        "mc-capilla": {
            bleachTTL: 20,
            data: {
                links: [
                    "a8:40:41:1c:84:28",
                    "a8:40:41:1c:86:6e",
                    "a8:40:41:1c:86:6d",
                ],
                coordinates: {
                    lon: "-64.37827",
                    lat: "-31.85482",
                },
                macs: [
                    "a8:40:41:1d:f9:26",
                    "aa:40:41:1f:74:f4",
                    "a8:40:41:1d:f8:f9",
                    "02:cc:4e:1f:74:f6",
                    "02:ab:46:1f:74:f6",
                    "a8:40:41:1f:74:f4",
                ],
                hostname: "mc-capilla",
            },
            author: "mc-capilla",
        },
        "ql-czuk": {
            bleachTTL: 23,
            data: {
                links: [
                    "14:cc:20:ad:b0:83",
                    "a8:40:41:1c:85:98",
                    "a8:40:41:1c:84:2e",
                    "a2:f3:c1:48:cf:ed",
                    "64:66:b3:87:4b:39",
                ],
                coordinates: {
                    lon: "-64.41506",
                    lat: "-31.80137",
                },
                macs: [
                    "a8:40:41:1f:71:f0",
                    "02:58:47:1f:71:f2",
                    "a8:40:41:1c:86:7f",
                    "a8:40:41:1c:86:96",
                    "02:ab:46:1f:71:f2",
                    "02:cc:4e:1f:71:f2",
                ],
                hostname: "ql-czuk",
            },
            author: "ql-czuk",
        },
    },
};
