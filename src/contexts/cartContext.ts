import { createContext } from "react";
import { CartStore } from "../stores/cart.store";

export const CartContext = createContext<CartStore>({} as CartStore);
export const CartProvider = CartContext.Provider;
