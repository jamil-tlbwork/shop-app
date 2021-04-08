import { createContext } from "react";
import { CheckoutStore } from "./../stores/checkout.store";

export const CheckoutContext = createContext<CheckoutStore>(
  {} as CheckoutStore,
);
export const CheckoutProvider = CheckoutContext.Provider;
