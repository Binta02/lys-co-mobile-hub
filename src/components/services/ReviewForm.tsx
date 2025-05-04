
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Check, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface ReviewFormProps {
  productName: string;
  onReviewSubmitted: () => void;
}

type FormData = {
  comment: string;
  name: string;
  email: string;
  saveInfo: boolean;
};

const ReviewForm = ({ productName, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      comment: '',
      name: '',
      email: '',
      saveInfo: false
    }
  });

  const onSubmit = async (data: FormData) => {
    if (rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez attribuer une note",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Vérifier si l'utilisateur est connecté
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour laisser un avis",
          variant: "destructive",
        });
        return;
      }

      const productId = id || 'unknown-product';
      
      // Enregistrer l'avis dans la base de données
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          product_name: productName,
          rating: rating,
          comment: data.comment,
          user_id: session.session.user.id,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Avis envoyé",
        description: "Merci pour votre avis !",
      });
      
      // Réinitialiser le formulaire
      reset();
      setRating(0);
      
      // Informer le composant parent qu'un nouvel avis a été soumis
      onReviewSubmitted();
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de votre avis",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        Donnez votre avis sur "{productName}"
      </h3>
      <p className="text-sm text-gray-500">
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Votre note *</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                type="button"
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
          <Label htmlFor="comment" className={errors.comment ? "text-red-500" : ""}>
            Votre avis *
          </Label>
          <Textarea 
            id="comment" 
            className={`min-h-[120px] ${errors.comment ? "border-red-500" : ""}`}
            {...register("comment", { required: true })}
          />
          {errors.comment && (
            <p className="text-sm text-red-500">Ce champ est requis</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-info"
            className="rounded border-gray-300"
            {...register("saveInfo")}
          />
          <Label htmlFor="save-info" className="text-sm">
            Enregistrer mes informations pour mes prochains commentaires.
          </Label>
        </div>

        <Button 
          type="submit" 
          className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 flex gap-2 items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Envoi en cours...</>
          ) : (
            <>
              <Send className="h-4 w-4" /> Soumettre
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
