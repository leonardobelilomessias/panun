/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'mfhcgmknerjfwohptyxn.supabase.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'https://via.placeholder.com*',
            port: '',
            pathname: '/**',
          },
        ],
      },
      
};

export default nextConfig;


