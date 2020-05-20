import { getCommunityGeoJSON } from './communityGeoJSON'

const getMockedNodesData = jest.fn(() => (
    {
        "host1": {
            "bleachTTL": 29,
            "data": {
                "hostname": "host1",
                "coordinates": {
                    "lon": "-64.42818",
                    "lat": "-31.81317"
                },
                "macs": [
                    "a0:f3:c1:86:31:d2",
                    "a0:f3:c1:86:31:d3",
                    "a2:f3:c1:86:31:d2"
                ],
                "links": [
                    "a0:f3:c1:46:28:37",
                    "a8:40:41:1c:85:44"
                ]
            },
            "author": "host1"
        },
        "host2": {
            "bleachTTL": 30,
            "data": {
                "links": [
                    "a0:f3:c1:86:31:d2",
                ],
                "coordinates": {
                    "lon": "-64.42450",
                    "lat": "-31.81799"
                },
                "macs": [
                    "a0:f3:c1:46:28:36",
                    "a0:f3:c1:46:28:37",
                    "a2:f3:c1:46:28:36"
                ],
                "hostname": "host2"
            },
            "author": "host2"
        },
        "host3": {
            "bleachTTL": 30,
            "data": {
                "hostname": "host3",
                "coordinates": {
                    "lon": "-64.39950",
                    "lat": "-31.79970"
                },
                "macs": [
                    "a8:40:41:1c:84:20",
                    "a8:40:41:1c:84:28",
                    "a8:40:41:1c:85:44"
                ],
                "links": [
                    "a0:f3:c1:86:31:d3",
                ]
            },
            "author": "host3"
        }
    }
));

function compareGeoJsons(a, b) {
    expect(a.type).toEqual(b.type);
    expect(a.features.length).toEqual(b.features.length);
    const resultFeatures = a.features;
    for (const feature of b.features) {
        expect(resultFeatures).toContainEqual(feature);
    }
}

test('getCommunityGeoJSON returns a well formed geo JSON', () => {
    const nodesData = getMockedNodesData();
    const geoJSON = getCommunityGeoJSON(nodesData);
    const expected = {
        "type": "FeatureCollection",
        "features": [
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.42818,-31.81317]},"properties":{"name":"host1"}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.42450,-31.81799]},"properties":{"name":"host2"}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.39950,-31.79970]},"properties":{"name":"host3"}},
            // Note: coordinates list is expected to be sorted to simplify testing
            {"type":"Feature","geometry":{"type":"LineString","coordinates":[[-64.42818,-31.81317],[-64.42450,-31.81799]].sort()}},
            {"type":"Feature","geometry":{"type":"LineString","coordinates":[[-64.42818,-31.81317],[-64.39950,-31.79970]].sort()}}
        ]

    };
    compareGeoJsons(geoJSON, expected);
});

test('getCommunityGeoJSON ignore nodes without coordinates and their links', () => {
    let nodesData = getMockedNodesData();
    nodesData.host2.data.coordinates = {lat: 'FIXME', lon: 'FIXME'};
    const geoJSON = getCommunityGeoJSON(nodesData);
    const expected = {
        "type": "FeatureCollection",
        "features": [
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.42818,-31.81317]},"properties":{"name":"host1"}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.39950,-31.79970]},"properties":{"name":"host3"}},
            // Note: coordinates list is expected to be sorted to simplify testing
            {"type":"Feature","geometry":{"type":"LineString","coordinates":[[-64.42818,-31.81317],[-64.39950,-31.79970]].sort()}}
        ]
    };
    compareGeoJsons(geoJSON, expected);
});

test('getCommunityGeoJSON ignore nodes without mac addresses', () => {
    let nodesData = getMockedNodesData();
    nodesData.host2.data.macs = [];
    const geoJSON = getCommunityGeoJSON(nodesData);
    const expected = {
        "type": "FeatureCollection",
        "features": [
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.42818,-31.81317]},"properties":{"name":"host1"}},
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.39950,-31.79970]},"properties":{"name":"host3"}},
            // Note: coordinates list is expected to be sorted to simplify testing
            {"type":"Feature","geometry":{"type":"LineString","coordinates":[[-64.42818,-31.81317],[-64.39950,-31.79970]].sort()}}
        ]
    };
    compareGeoJsons(geoJSON, expected);
});

test('getCommunityGeoJSON doesnt return geo points in keepClean coordinates', () => {
    let nodesData = getMockedNodesData();
    nodesData.host2.data.macs = [];
    const geoJSON = getCommunityGeoJSON(nodesData, [-64.42818,-31.81317]);
    const expected = {
        "type": "FeatureCollection",
        "features": [
            {"type":"Feature","geometry":{"type":"Point","coordinates":[-64.39950,-31.79970]},"properties":{"name":"host3"}},
            // Note: coordinates list is expected to be sorted to simplify testing
            {"type":"Feature","geometry":{"type":"LineString","coordinates":[[-64.42818,-31.81317],[-64.39950,-31.79970]].sort()}}
        ]
    };
    compareGeoJsons(geoJSON, expected);
});
