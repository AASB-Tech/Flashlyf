import Link from "next/link";

export default function Hashtags( {tags} ) {

    console.log("tags", tags);

    return (
        <>
            <div className="flex">
                
                {tags.map((tag) => {
                    <div key={tag}>
                        <Link href={`/${tags}`}>
                            <p className=" text-hashtagblue">
                                #{tag}
                            </p>
                        </Link>
                    </div>
                })}
            </div>
        </>
    )
}
