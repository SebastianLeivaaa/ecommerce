// app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-row text-black">
      <Sidebar />
      <div className="h-full w-full flex p-8 flex-col bg-gray-200">
        <Header />
        <main className='p-2 w-full h-full'>
            {children}
        </main>
      </div>
    </div>
  );
}
