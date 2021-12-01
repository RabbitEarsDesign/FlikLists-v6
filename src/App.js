import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
// PAGES
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import UserPage from "./pages/UserPage";

// COMPONENTS
import MainHeader from "./components/Layout/MainHeader";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  return (
    <div>
      <MainHeader />

      <main className="main">
        <Switch>
          <Route path="/auth" exact>
            {!isLoggedIn && <AuthPage />}
            {isLoggedIn && <Redirect to="/home" />}
          </Route>

          <Route path="/list">
            {isLoggedIn && <ListPage />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="/home" exact>
            <HomePage />
          </Route>

          <Route path="/user" exact>
            <UserPage />
          </Route>

          <Route path="/">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
