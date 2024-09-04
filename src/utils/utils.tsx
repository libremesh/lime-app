export function isEmpty(obj: object | null | undefined): boolean {
    // Check if the input is null, undefined, or not an object
    if (obj == null || typeof obj !== "object") {
        return true;
    }
    // Return true if the object has no own properties
    return Object.keys(obj).length === 0;
}
