import { atom } from "recoil";

/* 
    How to use this atom:

    import { useRecoilState } from "recoil";
    import userSate from "@/shared/state/userState.js";

    const [userState, setTestData] = useRecoilState(userState);

    setUserState("new value");

    console.log(userState)
*/

const userState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: null // default value (aka initial value)
});

export default userState;
