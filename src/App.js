// import
import React, { useContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
// PAGES
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import ListPage from "./pages/ListPage";
// import UserPage from "./pages/UserPage";

// COMPONENTS
import MainHeader from "./components/Layout/MainHeader";

// LAZY
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const ListPage = React.lazy(() => import("./pages/ListPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  return (
    <div>
      <MainHeader />
      <main className="main">
        <Suspense fallback={<p>Loading...</p>}>
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
        </Suspense>
      </main>
    </div>
  );
}

export default App;
