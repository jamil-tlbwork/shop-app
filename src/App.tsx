import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts";
import AppRouter from "./AppRouter";
import { authStoreInstance } from "./stores";

function App() {
  return (
    <>
      <Helmet>
        <title>Shop app</title>
      </Helmet>
      <AuthProvider value={authStoreInstance}>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
