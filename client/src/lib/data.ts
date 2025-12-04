
import hoodieImg from '@assets/generated_images/male_model_in_sage_green_hoodie_luxury_streetwear.png';
import poloImg from '@assets/generated_images/male_model_in_black_polo_shirt_luxury_vibe.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sage Heavyweight Hoodie',
    price: 180,
    category: 'Hoodies',
    image: hoodieImg,
    description: 'Crafted from premium 450gsm french terry cotton. Features an oversized fit with dropped shoulders and our signature distressing details.'
  },
  {
    id: '2',
    name: 'Noir Essential Polo',
    price: 120,
    category: 'Polos',
    image: poloImg,
    description: 'The definition of luxury basics. Made from silk-blend piqué cotton for a breathable yet structured fit. Finished with mother-of-pearl buttons.'
  },
  {
    id: '3',
    name: 'Olive Cargo Trousers',
    price: 220,
    category: 'Bottoms',
    image: hoodieImg, // Reusing for mockup until we have more
    description: 'Functional luxury. Japanese nylon blend with multiple utility pockets and adjustable hem toggles.'
  },
  {
    id: '4',
    name: 'Ashtray Signature Tee',
    price: 85,
    category: 'T-Shirts',
    image: poloImg, // Reusing for mockup
    description: 'Heavyweight cotton jersey with the iconic Ashtray monogram embroidered on the chest.'
  }
];

export const categories = ['All', 'Hoodies', 'Polos', 'T-Shirts', 'Bottoms', 'Accessories'];
