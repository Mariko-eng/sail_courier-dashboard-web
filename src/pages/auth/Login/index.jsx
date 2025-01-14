import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/extra_reducers";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.jpg'
import LoadingWidget from "../../../components/loading";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const store = useSelector((store) => store.auth);

  const navigate = useNavigate()

  // console.log(store)

  const submitData = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  }

  useEffect(() => {
    if (store.isLoading || store.user === undefined || store.user === null) {
      console.log("The user is not yet loaded!.");
    } else {
      if (Object.keys(store.user).length > 0) {
        console.log("The user is loaded successfully.");
        navigate("/home");
      }
    }
  }, [store, navigate])


  return (
    <div className="container-fluid p-0">
      {store.isLoading ? (
        <div className="w-100 d-flex bg-white justify-content-center align-items-center"
        style={{height:"100vh"}}
        >
          <LoadingWidget />
        </div>
      ) :
    (<div className="d-flex align-items-center py-4 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submitData}>
          <div className="d-flex justify-content-center">
            <img
              className="mb-4"
              src={logo}
              alt=""
              width="72"
              height="57"
            />
          </div>
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>

          {store.isLoading ? (
            <div className="text-center">
              .... Please wait ...
            </div>
          ) : (
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
          )}

        </form>
      </main>
    </div>)}
    </div>
  );
};

export default Login;
