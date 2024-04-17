/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
        })

        // if (isServer) {
        //     config.plugins.push(new PrismaPlugin())
        // }

        return config
    },
    compiler: {},
    typescript: {
        ignoreBuildErrors: true,
    },
    // experimental: {
    //     appDir: true,
    //     mdxRs: false,
    // },
    images: {
        unoptimized: true,
    },
    output: 'standalone',
};

export default nextConfig;
