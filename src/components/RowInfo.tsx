import React from "react";
import { Grid, Typography } from "@material-ui/core";

export const RowInfo: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Grid container>
    <Grid item xs={3}>
      <Typography variant="subtitle2">{label}:</Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography variant="subtitle1">{value}</Typography>
    </Grid>
  </Grid>
);
