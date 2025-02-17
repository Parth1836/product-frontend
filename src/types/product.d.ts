// interface for product
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  thumbnail: string;
}

// interface for product api response
export interface ProductAPIData {
    data: Product[],
    total: number
}

// interface for ProductCard prods
export interface ProductCardProps {
  product: Product;
  addToCart: (prodId: number) => void;
}
