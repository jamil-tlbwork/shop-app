import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IProduct } from "../models/product";
import React, { useContext } from "react";
import { CartContext } from "../contexts";
import { Observer } from "mobx-react";

const useStyles = makeStyles({
  root: {
    width: 180,
  },
  media: {
    height: 140,
  },
});

type ProductItemProps = {
  item: IProduct;
  count?: number;
};

export const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const classes = useStyles();
  const cartStore = useContext(CartContext);

  const addItem = () => cartStore.addItem(item);
  const removeItem = () => cartStore.removeItem(item.id);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`/images/products/${item.imageUrl}`}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="body1">{item.nama}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">${item.price}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Observer>
          {() => {
            const count = cartStore.getItemCount(item.id);
            return count ? (
              <>
                <IconButton onClick={removeItem}>
                  <RemoveCircleOutline />
                </IconButton>
                <Typography>{count}</Typography>
              </>
            ) : null;
          }}
        </Observer>
        <IconButton onClick={addItem}>
          <AddCircleOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
};
