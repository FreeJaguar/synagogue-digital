'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/display');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">מערכת לוח מידע דיגיטלי</h1>
        <p>מעביר לתצוגה הציבורית...</p>
      </div>
    </div>
  );
}
