import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import api from "@/clientAPI/api";

//Check if a page requires auth.

//A custom react hook that can be placed in pages.
//If the user is not logged in it will redirect the user to the redirectUrl
const usePageGaurd = (redirectUrl, block=true, AllowedRoles=["normal"], ) => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const response = await api.checkAuth();
            if (block == true && response.data.isAuth == false) 
            {
                console.log("NOT authenticated")
                router.replace(redirectUrl);
            }
            else if (block == false && response.data.isAuth == true) {
                if (AllowedRoles.includes(response.data.role)) {
                    console.log("authenticated")
                    //Store the userID and username of the logged in user into the browser local storage.
                    window.localStorage.setItem('loggedInUserID', response.data.user_id);
                    window.localStorage.setItem('loggedInUsername', response.data.username);
                    router.replace(redirectUrl);
                }
            } 
            //&& !window.localStorage.getItem("loggedInUserID")
        };
        checkAuth();
    }, [router, redirectUrl]);
};

export { usePageGaurd };
