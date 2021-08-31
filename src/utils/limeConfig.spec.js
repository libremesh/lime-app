import { resolveOverrides } from './limeConfig';

describe('resolveOverrides', () => {
    it('resolves accumulated config for each level', () => {
        const overrides = [
            ['node', {enabled: false}],
            ['community', {ssid: 'quintana-libre.org.ar'}],
            ['default', {ssid: 'LibreMesh.org', enabled: true}]
        ];
        const result = resolveOverrides(overrides);
        expect(result.default).toEqual(
            { ssid: 'LibreMesh.org', enabled: true }
        );
        expect(result.community).toEqual(
            { ssid: 'quintana-libre.org.ar', enabled: true }
        );
        expect(result.node).toEqual(
            { ssid: 'quintana-libre.org.ar', enabled: false }
        );
    })
})
