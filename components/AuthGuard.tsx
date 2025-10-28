// app/components/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/authService';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Gunakan authService untuk cek authentication
    const authenticated = authService.isAuthenticated();
    
    // console.log("Auth check:", authenticated);
    
    if (authenticated) {
      setIsAuthenticated(true);
    } else {
      router.push('/auth/team/login');
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}