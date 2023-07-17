/**
 * Converts a base64-encoded string to a Blob object of the specified file type.
 *
 * @param base64 - The base64-encoded string to convert to a Blob.
 * @param fileType - The MIME type of the file to create. (String)
 * @returns A Blob object representing the decoded data.
 */
export function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mimeType });
}
