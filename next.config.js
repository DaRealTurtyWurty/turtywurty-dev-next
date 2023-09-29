/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        "protocol": "https",
        "hostname": "avatars.githubusercontent.com",
        "port": '',
        "pathname": "**"
      }
    ]
  },
  output: "standalone"
}

module.exports = nextConfig
