import { useContext } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { CartContext } from "../contexts";

export const CartItems = () => {
  const cartStore = useContext(CartContext);
  return (
    <List style={{ width: 300 }}>
      {cartStore.items.map((item, index) => (
        <>
          <ListItem key={item.product.id}>
            <ListItemAvatar>
              <Avatar>
                <img
                  width="50"
                  src={`/images/products/${item.product.imageUrl}`}
                  alt="product"
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.product.nama} />
            <Typography>x{item.count}</Typography>
          </ListItem>
          {index < cartStore.items.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};
