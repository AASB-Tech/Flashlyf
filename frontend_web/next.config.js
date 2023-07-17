const CompressionPlugin = require("compression-webpack-plugin");
//This creates html pages which shows filesizes of bundles
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: (process.env.ANALYZE === 'true')
});

const isProd = (process.env.NEXT_PUBLIC_NODE_ENV === 'production');

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
      //Alternative syntax with regex: [/^localhost:/, /^127.0.0.1:/]
    domains: ["localhost",
                "127.0.0.1",
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}`,
                "http://localhost/",
                "https://localhost/",
                "http://127.0.0.1/",
                "http://127.0.0.1/",
                `http://${process.env.NEXT_PUBLIC_API_SERVER_URL}`
            ]
    },
    poweredByHeader: false, //remove "x-powered-by: NextJS" header (better cybersecurity)
      // Sets cache headers for each request
    async headers() {
        return [
        {
            source: '/_next/(.*)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=606461, immutable', //606461 = 1 week  31536000 = one year
            },
            ],
        },
        {
            source: '/static/(.*)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=606461, immutable',
            },
            ],
        },
        {
            //API responses are not cached by the browser
            source: '/api/(.*)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=0, must-revalidate',
            },
            ],
        },
        ];
    }
};

module.exports = nextConfig
