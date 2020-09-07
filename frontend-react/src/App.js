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
  Link,
  Redirect,
  useHistory
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

  const history = useHistory();

  // Event Handlers
 
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

  //Sign out
  const submitLogOut = () => {
    dispatch({
      type: "LOG OUT"
    });

    if(!state.isAuthenticated){
      history.Push('/login');
    }
  }

  useEffect(() => {
    readCookie();

  }, [])

  const Routes = (routes) => {
    const PrivateRoute = ({ auth, path, component, exact, ...props }) => {
      return auth ? (<Route {...props} path={path} exact={exact} component={component} />)
      : (<Redirect to="/login" />)
    };
  
    const ProtectLogin = ({ auth, path, component, exact, ...props }) => {
      return !auth ? (<Route {...props} path={path} exact={exact} component={component} />)
      : (<Redirect to="/dashboard" />)
    };

    return routes ? (
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact auth={state.isAuthenticated} path="/dashboard" component={Dashboard} />

        <ProtectLogin auth={state.isAuthenticated} exact path="/login" component={() =>
          <Login handleLogin={submitLogin} handleSignup={submitSignup}/>
        } />
        <Route exact path="/404" component={ErrorPage} />
        <Route exact path="*" render={() => <Redirect to="/404" />} />
      </Switch>
    ) : null
  }

  return (
    <Context.Provider value={{state, dispatch}}>
      <SEO title={state.isAuthenticated ? `Hello ${state.user.username}` : "Hello guest"} />

      <div className="container">
        <Router>
          <Link to="/">Home</Link>
          {state.isAuthenticated ? (
            <>
              {" "}
              <a href="#" onClick={submitLogOut}>Sign out</a>
            </>
            )
            : null
          }

          <Suspense fallback={
            <div className="loading">
              <h2 style={{ margin: "auto" }}>Loading...</h2>
            </div>
            }>
            <Routes routes={state.router}/>
          </Suspense>
        </Router>
      </div>
    </Context.Provider>
  );
}


export default App;
