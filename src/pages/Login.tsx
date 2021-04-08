import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts";

const useLoginStyle = makeStyles({
  root: {
    width: 400,
    margin: "100px auto",
  },
  logo: {
    textAlign: "center",
    width: 300,
    "& img": {
      width: "100%",
    },
  },
});

const Login = () => {
  const authStore = useContext(AuthContext);
  const history = useHistory();
  const classes = useLoginStyle();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const login = () => {
    if (!username || !password) {
      return setError("Username or password cannot be empty");
    }
    authStore.login(username, password);
    history.replace("/");
  };

  return (
    <form className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.logo}>
          <img src="/images/shopping-online.jpeg" alt="logo" />
        </Grid>
        {!!error && (
          <Grid item xs={12}>
            <Box mb={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            label="Password"
            fullWidth
            variant="outlined"
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
        <Grid item>
          <Box my={2}>
            <Button color="primary" variant="contained" onClick={login}>
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
