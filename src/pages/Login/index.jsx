// import React from 'react'
import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/extra_reducers";
import { useNavigate } from "react-router-dom";
import { getHomeRoute } from '../../utils/getHomeRoute';


const Login = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("");

  const dispatch = useDispatch()
  const store = useSelector((store) => store.auth);

  const navigate = useNavigate()

  // console.log(store)

  // const login = (email,password) =>{
  //   dispatch(loginUser({ email: email, password: password }));
  // }

  const submitData = (event) =>{
    event.preventDefault();
    alert("it works!");

    console.log(email);
    console.log(password);

    dispatch(loginUser({ email: email, password: password }));
  }

  useEffect(() => {
    if (Object.keys(store.user).length === 0) {
      console.log("The user object is empty.");
    } else {
      console.log("The user object has data.");
      navigate(getHomeRoute());
    }

  }, [store,navigate])


  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submitData}>
          <img
            className="mb-4"
            src="../assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
