import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-16" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="mt-2 flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-10 w-24" />
            </CardFooter>
        </Card>
    )
}