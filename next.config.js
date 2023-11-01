/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
 
  transpilePackages: [
    '@mui/material',
   '@mui/system',
   '@mui/icons-material',
   '@mui/styled-engine' // If @mui/icons-material is being used
  ]
}
const redirects = {
  
}
// const withTM = require('next-transpile-modules')([
//     '@mui/material',
//    '@mui/system',
//    '@mui/icons-material', // If @mui/icons-material is being used
//   ]);
  
//   module.exports = withTM({
//    webpack: (config) => {
//      config.resolve.alias = {
//        ...config.resolve.alias,
//      '@mui/styled-engine': '@mui/styled-engine-sc',
//       }
//       return config;
//     }
//   },
//   nextConfig
//   );
  
module.exports = {
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   };

  //   return config;
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shopping-cart',
        permanent: true,
      },
    ]
  },
  ...nextConfig,
  reactStrictMode: false,
  swcMinify: true,
  // onDemandEntries: {
  //   websocketPort: 3007,
  // },
  output: "standalone",
  i18n
  // distDir :'dist'
};
