import { Backdrop, CircularProgress } from "@material-ui/core";

export const PageLoader = () => {
  return (
    <Backdrop open style={{ color: "#fff", zIndex: 12 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
