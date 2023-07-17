import Cookies from 'js-cookie';

export default function get_csrf_token() {
    const csrftoken = Cookies.get('csrftoken');
    return csrftoken;
}
