
const IS_DEVMODE = process.env.NEXT_PUBLIC_NODE_ENV === "development";

export let BACKEND_URL = '';
if (IS_DEVMODE === true) {
    BACKEND_URL = `http://${process.env.NEXT_PUBLIC_API_SERVER_URL}:${process.env.NEXT_PUBLIC_API_SERVER_PORT}/`;
}
else if (IS_DEVMODE === false) {
    BACKEND_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
}
