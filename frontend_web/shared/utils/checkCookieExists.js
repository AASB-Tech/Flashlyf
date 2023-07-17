//Check if a cookie exists by name
export function checkCookieExists(name) {
    //First get all the cookies in the current document
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) 
    {
        //Trim trailing whitespace
        const cookie = cookies[i].trim();
        //check if cookie equals the name.
        if (cookie.startsWith(`${name}=`)) 
        {
            return true;
        }
    }
    return false;
}
