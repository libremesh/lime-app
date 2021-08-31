export function resolveOverrides(overrides) {
    const result = {};
    let accumulated = {};
    for (let i = overrides.length - 1; i >= 0; i--) {
        const [key, config] = overrides[i];
        accumulated = {
            ...accumulated,
            ...config
        };
        result[key] = accumulated;
    }
    return result;
}
