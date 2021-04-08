import React, { useContext, useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { ProductItem } from "../components/ProductItem";
import { productData } from "../models";
import { ProductsContext, ProductsProvider } from "../contexts/productContext";
import { ProductsStore } from "../stores";
import { observer } from "mobx-react";
import { PageLoader } from "../components/PageLoader";

const Products = observer(() => {
  const productsStore = useContext(ProductsContext);
  useEffect(() => {
    productsStore.fetchProduct();
  }, [productsStore]);

  if (!productsStore.products) {
    return <PageLoader />;
  }

  return (
    <Box my={4}>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          {productData.map((prod) => (
            <Grid item key={prod.id}>
              <ProductItem item={prod} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

const ProductWrapper = () => (
  <ProductsProvider value={new ProductsStore()}>
    <Products />
  </ProductsProvider>
);

export default ProductWrapper;
