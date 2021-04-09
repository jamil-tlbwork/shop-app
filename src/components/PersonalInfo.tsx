import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import React, { useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import { observer } from "mobx-react";
import { CheckoutContext } from "../contexts";

type PersonalInfoProps = {
  onNext: () => void;
};

export const PersonalInfo: React.FC<PersonalInfoProps> = observer(
  ({ onNext }) => {
    const checkoutStore = useContext(CheckoutContext);
    const { user } = checkoutStore;
    const validateUserProp = checkoutStore.validateUserProp.bind(checkoutStore);
    const isValidUserInfo = checkoutStore.validateUser.bind(checkoutStore);

    return (
      <>
        <Box mt={8} mb={4} component="div">
          <Typography variant="h6">Personal information</Typography>
        </Box>
        <form>
          <TextField
            value={user.name}
            onChange={(e) => (user.name = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Full Name"
            fullWidth
            error={!!validateUserProp("name")}
            helperText={validateUserProp("name")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={user.email}
            onChange={(e) => (user.email = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            error={!!validateUserProp("email")}
            helperText={validateUserProp("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={user.phone}
            onChange={(e) => (user.phone = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Phone"
            type="phone"
            fullWidth
            error={!!validateUserProp("phone")}
            helperText={validateUserProp("phone")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={user.address}
            onChange={(e) => (user.address = e.target.value)}
            margin="dense"
            variant="outlined"
            label="Address"
            multiline
            rows="3"
            fullWidth
            error={!!validateUserProp("address")}
            helperText={validateUserProp("address")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Box my={2} component="div">
            <Button
              disabled={isValidUserInfo()}
              variant="contained"
              fullWidth
              color="primary"
              onClick={onNext}
            >
              Continu to Payment
            </Button>
          </Box>
        </form>
      </>
    );
  },
);
