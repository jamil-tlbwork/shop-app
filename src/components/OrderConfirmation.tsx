import { Avatar, Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";

import { ProductImage } from "../components/ProductImage";
import { RowInfo } from "./RowInfo";
import { ICartItem } from "../models";

type OrderConfirmationProps = {
  totalPrice: number;
  orderId: string;
  items: ICartItem[];
};

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  totalPrice,
  orderId,
  items,
}) => {
  return (
    <>
      <Box mb={5} component="div">
        <Typography variant="h6">Thanks for shopping with us</Typography>
      </Box>
      <RowInfo label="Order Id" value={orderId} />
      <RowInfo label="Amount" value={`$${totalPrice}`} />
      <Typography variant="subtitle2">Products:</Typography>

      {items.map((item) => (
        <>
          <Box py={3} key={item.product.id} component="div">
            <Grid container alignItems="center" justify="space-between">
              <Grid item container spacing={2} alignItems="center" xs={10}>
                <Grid item>
                  <Avatar>
                    <ProductImage imgUrl={item.product.imageUrl} width={50} />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{item.product.nama}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={2} spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="body1">${item.product.price}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">x{item.count}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </>
      ))}
    </>
  );
};
