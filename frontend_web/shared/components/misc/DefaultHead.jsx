import Head from "next/head";
import { useRouter } from "next/router";

export default function DefaultHead({
        title,
        description = "Social media app",
        image,
        type = "website",
        children,
    })  {
    const { asPath } = useRouter();

    const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`;

    return (
        <>
            <Head>
            <meta charSet="utf-8" />

            <title itemProp="headline">{title}</title>
            {description ? (
                <>
                <meta
                    itemProp="description"
                    name="description"
                    content={description}
                />
                <link rel="canonical" href={currentUrl}></link>
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                
                {/* <meta name="theme-color" content="#000000" /> */}
                <meta name="theme-color" content="#FFFFFF" />
                <meta name="csrf-token" content="put-csrf-token-here"></meta>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
                <link rel="apple-touch-icon" href="/logo192.png" />
                {/* <!--
                manifest.json provides metadata used when your web app is installed on a
                user's mobile device or desktop. 
                https://developers.google.com/web/fundamentals/web-app-manifest/
                https://developer.mozilla.org/en-US/docs/Web/Manifest
                --> */}
                <link rel="manifest" href="/manifest.json" />
                </>
            ) : (
                <meta name="robots" content="noindex, nofollow" />
            )}
            </Head>
            
            {children}
        </>
    );
}
