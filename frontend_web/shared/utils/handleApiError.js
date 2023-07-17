// A function for handling the API / Axios Errors
export default function handleApiError(error) {
    const IS_DEVMODE = process.env.NEXT_PUBLIC_NODE_ENV === "development";

    if (error.response) {
        // For debugging
        if (IS_DEVMODE) {
            console.log("AXIOS ERROR: ")
            console.log("-----------: ")
            console.error('Error status:', error.response.status);
            console.error('Error message:', error.response.statusText);
            console.error('Error data:', error.response.data);
            console.log("-----------: ")
        }
        return error.response.data;
    } 
    // Axios gives an unknown error when the request is not succesful
    else 
    {
        // For debugging
        if (IS_DEVMODE) {
            console.error('Error message:', error.message);
        }
        const errorResponse = {
            success: false,
            message: "Something went wrong.",
            data: {},
            errors: [
                {
                    attr: null,
                    code: "Unknown",
                    message: error.message
                }
            ]
        };
        return errorResponse;
    }
}
