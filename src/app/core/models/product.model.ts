export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  ratings: RatingModel;
}

export interface RatingModel {
  rate: number;
  count: number;
}
