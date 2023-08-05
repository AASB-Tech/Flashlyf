import Link from "next/link";

export default function Username({ username, classes }) {

    return (
        <>
            <Link href={`/${username}`}>
                <p
                    className={`${classes} font-bold text-black`}
                >
                    @{username}
                </p>
            </Link>
        </>
    )
}
