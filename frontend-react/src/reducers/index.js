import Cookies from "js-cookie";

// Initial state
export const initialState = {
  "isAuthenticated": false,
  "token": null,
  "blog": null,
  "user": {
    "username": null,
    "email": null
  },
  "comment": null,
  "router": false
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "ROUTER":
      return {
        ...state,
        "router": true
      }
    case "LOGIN":
      Cookies.set('token', JSON.stringify(action.payload.token), {expires: 7});
      localStorage.setItem("username", action.payload.user.username);
      localStorage.setItem("useremail", action.payload.user.email);

      return {
        ...state,
        "isAuthenticated": true,
        "token": action.payload.token,
        "user": action.payload.user
      };
    case "CHECKTOKEN":
      const username = localStorage.getItem("username");
      const useremail = localStorage.getItem("useremail");

      return{
        ...state,
        "isAuthenticated": true,
        "user": {
          "username": username,
          "email": useremail 
        }
      }
    case "LOG OUT":
      Cookies.remove("token");
      localStorage.clear();
      console.log('logiut')

      return {
        ...state,
        "isAuthenticated": false
      };
    default:
      return state;
  }
};

export default reducer;