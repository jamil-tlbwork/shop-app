import { createContext } from "react";
import { ProductsStore } from "../stores/product.store";

export const ProductsContext = createContext<ProductsStore>(
  {} as ProductsStore,
);
export const ProductsProvider = ProductsContext.Provider;
