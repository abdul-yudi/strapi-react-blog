import React, {
  useEffect,
  useReducer,
  Suspense,
  lazy
} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import reducer, {initialState} from "./reducers";

import SEO from "./utils/seo"

// pages
const ErrorPage = lazy(() => import("./pages/error/Page404"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Context
const Context = React.createContext();

// API endpoint
// API Login
const LOGIN_API = "http://localhost:1337";

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // Event Handlers
  // Login
  const submitLogin = (email, pass) => {
    axios.post(`${LOGIN_API}/auth/local`, {
      "identifier": email,
      "password": pass
    })
    .then(response => {
      dispatch({
        type: "LOGIN",
        payload: {
          "token": response.data.jwt,
          "user": response.data.user
        }
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Signup
  const submitSignup = (user, email, pass) => {
    
  }

  const readCookie = async () => {
    const token = await JSON.parse(Cookies.get("token") || null)
    if(token){
      dispatch({
        type: "CHECKTOKEN"
      });
    }
    
    if(!token || token){
      dispatch({
        type: "ROUTER"
      });
    }
  };

  useEffect(() => {
    readCookie();
  }, [])

  const PrivateRoute = ({ auth, path, component, exact, ...props }) => {
    return auth ? (<Route {...props} path={path} exact={exact} component={component} />)
    : (<Redirect to="/login" />)
  };

  const ProtectLogin = ({ auth, path, component, exact, ...props }) => {
    return !auth ? (<Route {...props} path={path} exact={exact} component={component} />)
    : (<Redirect to="/dashboard" />)
  };

  return (
    <Context.Provider value={{state, dispatch}}>
      {console.log(state.isAuthenticated, "auth")}
      {console.log(state, "seo")}
      <SEO title={state.isAuthenticated ? `Hello ${state.user.username}` : "Hello guest"}/>
      <div className="container">
        <Router>
          <Suspense fallback={
            <div className="loading">
              <h2 style={{ margin: "auto" }}>Loading...</h2>
            </div>
          }>
            {state.router ? (
              <Switch>
                <PrivateRoute exact auth={state.isAuthenticated} path="/home" component={Home} />
                <PrivateRoute exact auth={state.isAuthenticated} path="/dashboard" component={Dashboard} />
                <ProtectLogin auth={state.isAuthenticated} exact path="/login" component={() =>
                  <Login handleLogin={submitLogin} handleSignup={submitSignup} aa={console.log("login") }/>
                } />
                <Route exact path="/404" component={ErrorPage} />
                <Route exact path="*" render={() => <Redirect to="/404" />} />
              </Switch>
            ) : null}
          </Suspense>
        </Router>
      </div>
    </Context.Provider>
  );
}


export default App;
