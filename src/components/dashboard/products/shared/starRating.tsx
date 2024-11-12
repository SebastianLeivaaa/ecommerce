
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} value={rating} readOnly />
            <span className="ml-1 text-sm text-gray-600">
                {rating.toFixed(1)}
            </span>
        </div>
    );
};
