import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    /* Check if user is authenticated or not and navigate to login page if necessary.
      Also, set the loader to false when the authentication status changes.

      Add your code here to check authentication status and navigate accordingly. */

    //TODO: make it more easy to understand

    /* if (authStatus ===true){
          navigate("/")
      } else if (authStatus === false) {
          navigate("/login")
      }

     // let authValue = authStatus === true ? true : false */

    if (authentication && authStatus !== authentication) {
      navigate("login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
