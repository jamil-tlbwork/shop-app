export interface IProduct {
  id: number;
  nama: string;
  imageUrl: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  count: number;
}
