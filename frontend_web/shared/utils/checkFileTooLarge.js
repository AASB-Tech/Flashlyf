/**
 * Returns true if file is too large
 * Returns false if file is limit
 * @param {Number} fileSize size of a file in bytes
 * @param {Number} limit max size of a file in bytes
 * @returns {Boolean}
 */
export default function checkFileTooLarge(fileSize, limit = 1.5 * GB) {
    if (fileSize >= limit) {
        return true;
    }
    return false;
}
