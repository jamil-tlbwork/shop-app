import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from "@material-ui/core";
import React, { useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LockIcon from "@material-ui/icons/Lock";
import EventIcon from "@material-ui/icons/Event";
import { observer } from "mobx-react";
import { CheckoutContext } from "../contexts";

type PaymentInfoProps = {
  onNext: () => void;
  onBack: () => void;
};

export const PaymentInfo: React.FC<PaymentInfoProps> = observer(
  ({ onNext, onBack }) => {
    const { paymentInfo } = useContext(CheckoutContext);

    ///////////////////////////////////////////////////////
    /// NOTE: Third party validation should be applied. ///
    //////////////////////////////////////////////////////
    // empty check on the form
    const isValidPayment = Object.values(paymentInfo).every((value) => value);

    return (
      <>
        <Box mt={8} mb={4}>
          <Typography variant="h6">Payment information</Typography>
        </Box>
        <form>
          <TextField
            value={paymentInfo.cardNumber}
            onChange={(e) => (paymentInfo.cardNumber = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Card number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={paymentInfo.name}
            onChange={(e) => (paymentInfo.name = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Name on the card"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <TextField
                value={paymentInfo.expiryDate}
                onChange={(e) => (paymentInfo.expiryDate = e.target.value)}
                margin="dense"
                variant="outlined"
                label="Expiry Date MM/YY"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={paymentInfo.cvv}
                onChange={(e) => {
                  if (e.target.value?.length <= 3) {
                    paymentInfo.cvv = e.target.value;
                  }
                }}
                margin="dense"
                variant="outlined"
                label="CVV"
                fullWidth
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box my={2}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth onClick={onBack}>
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={!isValidPayment}
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={onNext}
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </>
    );
  },
);
