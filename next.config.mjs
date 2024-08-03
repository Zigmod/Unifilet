/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "quirky-coyote-356.convex.cloud"
            }
        ]
    }
};


export default nextConfig;
