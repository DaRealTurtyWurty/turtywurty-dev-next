import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co'
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'yt3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/agerlocus/Build/:path*.framework.js.gz",
                headers: [
                    {key: "Content-Encoding", value: "gzip"},
                    {key: "Content-Type", value: "application/javascript"},
                ],
            },
            {
                source: "/agerlocus/Build/:path*.wasm.gz",
                headers: [
                    {key: "Content-Encoding", value: "gzip"},
                    {key: "Content-Type", value: "application/wasm"},
                ],
            },
            {
                source: "/agerlocus/Build/:path*.data.gz",
                headers: [
                    {key: "Content-Encoding", value: "gzip"},
                    {key: "Content-Type", value: "application/octet-stream"},
                ],
            },
            {
                source: "/mystic-factories/Build/:path*.framework.js.br",
                headers: [
                    {key: "Content-Encoding", value: "br"},
                    {key: "Content-Type", value: "application/javascript"},
                ],
            },
            {
                source: "/mystic-factories/Build/:path*.wasm.br",
                headers: [
                    {key: "Content-Encoding", value: "br"},
                    {key: "Content-Type", value: "application/wasm"},
                ],
            },
            {
                source: "/mystic-factories/Build/:path*.data.br",
                headers: [
                    {key: "Content-Encoding", value: "br"},
                    {key: "Content-Type", value: "application/octet-stream"},
                ],
            },
        ];
    },
};

export default nextConfig;
