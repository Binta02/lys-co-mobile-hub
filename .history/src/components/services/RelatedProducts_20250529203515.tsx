// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

// const RelatedProducts = () => {
//   return (
//     <div className="mt-16">
//       <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Réception colis (3 mois)</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <p className="text-2xl font-semibold text-lysco-turquoise">18,00 €</p>
//             <Link to="/service/reception-colis">
//               <Button className="w-full">Ajouter au panier</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Scan courrier (3 mois)</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <p className="text-2xl font-semibold text-lysco-turquoise">18,00 €</p>
//             <Link to="/service/scan-courrier">
//               <Button className="w-full">Ajouter au panier</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Création courrier administratif ou commercial</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <p className="text-2xl font-semibold text-lysco-turquoise">30,00 €</p>
//             <Link to="/service/creation-courrier">
//               <Button className="w-full">Ajouter au panier</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Tableau local des produits
const PRODUCTS = [
  {
    id: "pack-domicilie",
    title: "Pack domicilié",
    price: 1514,
    category: "domiciliation",
    link: "/domiciliation/pack-domicilie",
  },
  {
    id: "domiciliation-3mois-micro",
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: 72,
    category: "domiciliation",
    link: "/domiciliation/3mois-micro-entreprise",
  },
  {
    id: "domiciliation-3mois-entreprise",
    title: "Domiciliation 3 mois – Entreprise",
    price: 108,
    category: "domiciliation",
    link: "/domiciliation/3mois-entreprise",
  },
  {
    id: "domiciliation-6mois-micro",
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: 108,
    category: "domiciliation",
    link: "/domiciliation/6mois-micro-entreprise",
  },
  {
    id: "domiciliation-6mois-entreprise",
    title: "Domiciliation 6 mois – Entreprise",
    price: 162,
    category: "domiciliation",
    link: "/domiciliation/6mois-entreprise",
  },
  {
    id: "domiciliation-1an-entreprise",
    title: "Domiciliation 1 an – Entreprise",
    price: 361.8,
    category: "domiciliation",
    link: "/domiciliation/1an-entreprise",
  },
  // ...ajoute d'autres produits si besoin
];

const RelatedProducts = ({ currentId, currentCategory }) => {
  const related = PRODUCTS.filter(
    (p) => p.category === currentCategory && p.id !== currentId
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((prod) => (
          <Card key={prod.id}>
            <CardHeader>
              <CardTitle>{prod.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold text-lysco-turquoise">
                {prod.price.toFixed(2)} €
              </p>
              <Link to={prod.link}>
                <Button className="w-full">Voir le produit</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
