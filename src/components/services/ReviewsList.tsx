
import React from 'react';
import { Star } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name?: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

const ReviewsList = ({ reviews, isLoading }: ReviewsListProps) => {
  if (isLoading) {
    return <div className="text-center py-8">Chargement des avis...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8">Aucun avis pour le moment.</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-semibold">{review.user_name || "Client"}</h4>
                <p className="text-sm text-gray-500">
                  {formatDistance(new Date(review.created_at), new Date(), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList;
