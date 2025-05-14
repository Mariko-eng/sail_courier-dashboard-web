import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../store/extra_reducers";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.jpg'
import LoadingWidget from "../../../components/loading";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Address is required!'),
  password: Yup.string().required('Password is required!'),
})

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const dispatch = useDispatch()
  const store = useSelector((store) => store.auth);

  const navigate = useNavigate()

  const validateData = async () => {
    try {
      // Validate the email and password with the validation schema
      await validationSchema.validate(
        { email, password },
        { abortEarly: false } // Collect all errors
      );
      setValidationErrors([]);
      return true;
    } catch (err) {
      const errors = err.inner.map((item) => ({
        name: item.path,
        message: item.message
      }));

      setValidationErrors(errors);
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValid = await validateData();

    if (formValid == false) {
      return;
    }

    dispatch(loginUser({ email: email, password: password }));
  }

  useEffect(() => {
    if (store.isLoading || store.user === undefined || store.user === null) {
    } else {
      if (Object.keys(store.user).length > 0) {
        navigate("/home");
      }
    }
  }, [store, navigate])


  return (
    <div className="container-fluid p-0">
      {store.isLoading ? (
        <div className="w-100 d-flex bg-white justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <LoadingWidget />
        </div>
      ) :
        (<div className="d-flex align-items-center py-4 bg-body-tertiary">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
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

              <div className="form-floating mb-2">
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

              {validationErrors.map((item, idx) => (
                <div key={idx} className="my-2 text-start text-danger">{item.message}</div>
              ))}

              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign in
              </button>

            </form>

            <div className="d-flex justify-content-end my-3">
              <Link to={"/reset-password"} className="text-primary">Reset password?</Link>
            </div>
          </main>
        </div>)}
    </div>
  );
};

export default Login;
