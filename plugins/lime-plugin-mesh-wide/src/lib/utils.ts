export const readableBytes = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";
    const i = parseInt(
        Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
        10
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;

    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Get the strings that appear on the first array but not on the second one
 * @param array1
 * @param array2
 */
export const getArrayDifference = (array1: string[], array2: string[]) => {
    return array1.filter((item) => !array2.includes(item));
};
