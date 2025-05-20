// utils/getRedirectUrl.ts
export function getRedirectUrl() {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000/entrar';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      return `https://${process.env.VERCEL_URL}/entrar`;
    } else {
      return    'http://localhost:3000/entrar';
    }
  }
  