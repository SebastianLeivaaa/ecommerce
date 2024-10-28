"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';



export const TanstackProvider = ({ children } : {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 2,
                staleTime: 1000 * 60 * 5,
            },
        }
    }));

    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
