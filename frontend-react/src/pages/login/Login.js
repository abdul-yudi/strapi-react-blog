import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./login.css"

const Login = (props) => {
	// ({...porps1}) / (props1) get all object
	// ({props1}) get object name props1

	const {
		handleLogin,
		handleSignup
	} = props;

	console.log(handleLogin)

  const [data, setData] = useState({
  	"userName": null,
  	"email": null,
  	"password": null
  });

  const handleChange = e => {
  	setData({
  		...data,
	  	[e.target.name]: e.target.value,
  	})
  };

  const actionLogin = () => {
  	return handleLogin(data.email, data.password);
  }

  const actionSignup = () => {
  	return handleSignup;
  }

  return (
    <>
      <h1>Login</h1>
			<div id="logreg-forms">
			  <form className="form-signin">
			    <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
			      {" "}
			      Sign in
			    </h1>
			    {/* <div className="social-login">
			      <button className="btn facebook-btn social-btn" type="button">
			        <span>
			          <i className="fab fa-facebook-f" /> Sign in with Facebook
			        </span>{" "}
			      </button>
			      <button className="btn google-btn social-btn" type="button">
			        <span>
			          <i className="fab fa-google-plus-g" /> Sign in with Google+
			        </span>{" "}
			      </button>
			    </div>
			    <p style={{ textAlign: "center" }}> OR</p> */}
			    <input
			      type="email"
			      name="email"
			      className="form-control"
			      placeholder="Email address"
			      onChange={handleChange}
			    />
			    <input
			      type="password"
			      name="password"
			      className="form-control"
			      placeholder="Password"
			      onChange={handleChange}
			    />
          <br/>
			    <button className="btn btn-success btn-block" type="button" onClick={actionLogin}>
			      <i className="fas fa-sign-in-alt" /> Sign in
			    </button>
			    <Link to={""} id="forgot_pswd">
			      Forgot password?
			    </Link>
			    <hr />
			    {/* <p>Don't have an account!</p>  */}
			    <button className="btn btn-primary btn-block" type="button" id="btn-signup">
			      <i className="fas fa-user-plus" /> Sign up New Account
			    </button>
			  </form>
			  <form className="form-reset">
			    <input
			      type="email"
			      id="resetEmail"
			      className="form-control"
			      placeholder="Email address"
			      required
			    />
			    <button className="btn btn-primary btn-block" type="submit">
			      Reset Password
			    </button>
			    <Link to={""} id="cancel_reset">
			      <i className="fas fa-angle-left" /> Back
			    </Link>
			  </form>
			  <form className="form-signup">
			    <div className="social-login">
			      <button className="btn facebook-btn social-btn" type="button">
			        <span>
			          <i className="fab fa-facebook-f" /> Sign up with Facebook
			        </span>{" "}
			      </button>
			    </div>
			    <div className="social-login">
			      <button className="btn google-btn social-btn" type="button">
			        <span>
			          <i className="fab fa-google-plus-g" /> Sign up with Google+
			        </span>{" "}
			      </button>
			    </div>
			    <p style={{ textAlign: "center" }}>OR</p>
			    <input
			      type="text"
			      id="username"
			      className="form-control"
			      placeholder="Full name"
			      required
			    />
			    <input
			      type="email"
			      id="email"
			      className="form-control"
			      placeholder="Email address"
			      required
			    />
			    <input
			      type="password"
			      id="password"
			      className="form-control"
			      placeholder="Password"
			      required
			    />
			    <input
			      type="password"
			      id="confirmPassword"
			      className="form-control"
			      placeholder="Repeat Password"
			      required
			    />
			    <button className="btn btn-primary btn-block" onClick={actionSignup}>
			      <i className="fas fa-user-plus" /> Sign Up
			    </button>
			    <Link to={""} id="cancel_signup">
			      <i className="fas fa-angle-left" /> Back
			    </Link>
			  </form>
			  <br />
			</div>
    </>
  );
};

export default Login;
