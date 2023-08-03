import axios from "axios";
//import Cookies from 'js-cookie';
import createMultiPartFormData from "@/shared/utils/createMultiPartFormData";
import get_csrf_token from "@/shared/utils/getCsrfToken.js";
import handleApiError from "@/shared/utils/handleApiError.js";

/*
    How to use this API:

    import api from "@clientAPI/api.js";

    const res = await api.methodName()
*/

const IS_DEVMODE = process.env.NEXT_PUBLIC_NODE_ENV === "development";

let baseURL = '';
if (IS_DEVMODE === true) {
    baseURL = `http://${process.env.NEXT_PUBLIC_API_SERVER_URL}:${process.env.NEXT_PUBLIC_API_SERVER_PORT}/`;
}
else if (IS_DEVMODE === false) {
    baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;
}

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 9000 //Timeout response after 9 seconds
});

// This adds the CSRF token header to all non-GET requests
axiosInstance.interceptors.request.use(config => {
    const method = config.method.toUpperCase();
    if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(method)) {
        //const csrftoken = Cookies.get('csrftoken');
        config.headers['X-CSRFTOKEN'] = get_csrf_token();
    }
    return config;
});

/*
    The Axios error is triggered when an HTTP response is received, 
    with a status code outside the range of 2xx (successful responses). 
*/
class Api {
    constructor() {
        this._api = axiosInstance;
    }

    get api() {
        return this._api;
    }

    /**
     *
     * @param {String} email
     * @param {String} password
     * @returns
    */
    async login(email, password) {
        try {
            const response = await this.api.post("api/auth/login", { email: email, password: password });
            return response.data;
        }
        catch (error) {
            return handleApiError(error);
        }
    }

    /**
     *
     * @param {String} username
     * @param {String} email
     * @param {String} password
     * @returns
    */
    async register(email, username, password) {
        try {
            const response = await this.api.post("api/auth/register", {
                email: email,
                username: username,
                password: password
            });
            return response.data;
        }
        catch (error) {
            return handleApiError(error);
        }
    }

    //Check if a user is authenticated on the server (logged in)
    async checkAuth() {
        try {
            const response = await this.api.get("api/auth/checkAuth");
            return response.data;
        }
        catch (error) {
            return handleApiError(error);
        }
    }

    //Log out the user from the server
    async logout() {
        try {
            const response = await this.api.post("api/auth/logout");
            return response.data;
        }
        catch (error) {
            return handleApiError(error);
        }
    }

    /**
     *
     * @param {String} newPassword
     * @returns
    */
    async changePassword(newPassword) {
        try {
            const response = await this.api.post("api/auth/changePassword", {
                newPassword: newPassword
            });
            return response.data;
        }
        catch (error) {
                return handleApiError(error);
        }
    }

        /**
     *
     * @param {String} email
     * @returns
    */
    async resetPassword(email) {
        try {
            const response = await this.api.post("api/auth/resetPassword", {
                email: email
            });
            return response.data;
        }
        catch (error) {
                return handleApiError(error);
        }
    }

    async createPost(postData, file=null) {
        try {
            const multipartData = createMultiPartFormData(postData, file);
            const response = await this.api.post("api/posts/createPost", multipartData, {
                headers: { "content-type": "multipart/form-data" }
            });
            return response.data;
        }
        catch (error) {
                return handleApiError(error);
        }
    }

    async getPostsUser(user_id, limit=100) {
        try {
            const response = await this.api.get(`api/posts/getPostsUser/${user_id}?limit=${limit}`);
            return response.data;
        }
        catch (error) {
                return handleApiError(error);
        }
    }
    
    async getFollowersList() {
        try {
            const response = await this.api.get(`api/followers/getFollowersList`);
            return response.data;
        }
        catch (error) {
                return handleApiError(error);
        }
    }
}

const FlashLyfApi = new Api();
export default FlashLyfApi;
