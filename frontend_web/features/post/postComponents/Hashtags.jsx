import Link from "next/link";

export default function Hashtags( {tags} ) {
    // TODO: Make sure the link, links to a hashtag search query
    return (
        <div className="flex">
            {tags.map((tag) => (
                <Link key={tag} href={`/${tag}`}>
                    <p className="text-white ml-2">
                        #{tag}
                    </p>
                </Link>
            ))}
        </div>
    );
}
