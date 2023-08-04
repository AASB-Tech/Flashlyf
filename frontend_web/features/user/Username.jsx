"use client"

export default function Username({ classes }) {

    return (
        <>
            <p
                className={classes}
            >
                @{window.localStorage.getItem('loggedInUsername').length > 0 ?
                    window.localStorage.getItem('loggedInUsername')
                    :
                    "Username"
                }
            </p>
        </>
    )
}
