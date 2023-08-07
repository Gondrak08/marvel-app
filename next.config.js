/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath:'/',  
  experimental: {
        serverActions: true,
      },

  async redirects(){
    return [
      {
        source:'/',
        destination:'/login',
        permanent:true
      }
    ]
  }
}

module.exports = nextConfig

