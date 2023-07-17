"use client"

import { RecoilRoot } from "recoil";

function RecoilProvider({ children })
{

    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}

export default RecoilProvider
