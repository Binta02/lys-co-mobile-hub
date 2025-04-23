
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ReviewFormProps {
  productName: string;
}

const ReviewForm = ({ productName }: ReviewFormProps) => {
  const [rating, setRating] = React.useState<number>(0);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        Soyez le premier à laisser votre avis sur "{productName}"
      </h3>
      <p className="text-sm text-gray-500">
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *
      </p>
      
      <div className="space-y-2">
        <Label>Votre note *</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant="ghost"
              size="sm"
              className={`p-0 h-auto ${rating >= value ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(value)}
            >
              <Star className="h-6 w-6 fill-current" />
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Votre avis *</Label>
        <Textarea id="review" className="min-h-[120px]" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nom *</Label>
        <Input id="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" required />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="save-info"
          className="rounded border-gray-300"
        />
        <Label htmlFor="save-info" className="text-sm">
          Enregistrer mon nom, mon e-mail et mon site dans le navigateur pour mon prochain commentaire.
        </Label>
      </div>

      <Button className="bg-lysco-turquoise hover:bg-lysco-turquoise/90">
        Soumettre
      </Button>
    </div>
  );
};

export default ReviewForm;
