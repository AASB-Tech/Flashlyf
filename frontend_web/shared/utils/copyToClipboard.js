export default function copyToClipboard(value) {
    navigator.clipboard.writeText(`${value}`);
};
