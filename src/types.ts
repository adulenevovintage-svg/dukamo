export type CategoryType = 'all' | 'burgers' | 'bowls' | 'black-coffee' | 'milk-coffee' | 'non-coffee' | 'juices' | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  ingredients?: string;
  description?: string;
  price: number | string; // ETB, some items might have a range or dual price like 260 / 280
  prices?: { small: number; large: number }; // Dual pricing support
  category: CategoryType;
  image?: string;
  isSpecialty?: boolean;
}

export interface BasketItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: 'small' | 'large' | 'standard';
}

export interface FeedbackMessage {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
