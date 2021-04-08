import {
  Badge,
  Button,
  Box,
  makeStyles,
  Theme,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Popover,
} from "@material-ui/core";
import { Observer } from "mobx-react";
import React, { ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext, CartContext } from "../contexts";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CartItems } from "../components/CartItems";
import { Link } from "react-router-dom";
import ShopIcon from "@material-ui/icons/Shop";

const useLayoutStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  checkout: {
    borderRadius: 0,
  },
}));

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const authStore = useContext(AuthContext);
  const cartStore = useContext(CartContext);
  const history = useHistory();
  const classes = useLayoutStyles();
  const [popover, setPopover] = useState<any>();

  const logout = () => {
    authStore.logout();
    history.replace("/login");
  };

  const openPopover = (e: any) => {
    if (cartStore.count) {
      setPopover(e.currentTarget);
    }
  };
  const closePopover = () => setPopover(null);

  const navigateToCheckout = () => {
    closePopover();
    history.push("/checkout");
  };

  return (
    <>
      <Box className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                Products
              </Link>
            </Typography>

            <IconButton color="inherit" onClick={openPopover}>
              <Observer>
                {() => (
                  <Badge badgeContent={cartStore.count} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </Observer>
            </IconButton>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Popover
          open={!!popover}
          anchorEl={popover}
          onClose={closePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <CartItems />
          <Button
            fullWidth
            variant="contained"
            onClick={navigateToCheckout}
            className={classes.checkout}
            color="primary"
            startIcon={<ShopIcon />}
          >
            Checkout (total ${cartStore.totalPrice})
          </Button>
        </Popover>
      </Box>

      {children}
    </>
  );
};

export default Layout;
