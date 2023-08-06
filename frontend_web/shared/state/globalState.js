import { atom } from "recoil";

/* 
    How to use this atom:

    import { useRecoilState } from "recoil";
    import { userSate } from "@/shared/state/globalState.js";

    const [userState, setUserState] = useRecoilState(userState);

    setUserState("new value");

    console.log(userState)
*/

export const postTypeFilterState = atom({
    key: "postTypeFilterState",
    default: {
        text: true,
        image: true,
        video: true,
        audio: true,
    }
});

export const orderFilterState = atom({
    key: "orderTypeFilterState",
    default: {
        top: false,
        expiring: false,
        recent: true,
    }
});

export const userState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: null // default value (aka initial value)
});
