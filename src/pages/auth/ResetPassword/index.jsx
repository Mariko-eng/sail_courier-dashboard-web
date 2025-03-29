import "./index.css";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.jpg'
import LoadingWidget from "../../../components/loading";
import { resetUserPassword } from "../store/extra_reducers";

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Address is required!'),
})

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

  const validateData = async () => {
    try {
      // Validate only email as we are resetting password based on email
      await validationSchema.validate({ email }, { abortEarly: false });
      console.log('Validation successful!');
      setValidationErrors([]);
      return true;
    } catch (err) {
      const errors = err.inner.map((item) => ({
        name: item.path,
        message: item.message
      }));

      console.log('Validation errors:', errors);
      setValidationErrors(errors);
      return false;
    }
  }

  const handleSubmit = useCallback(async() => {
    setLoading(true);
    setErrorMessage(""); // Reset error message
    try {
        await resetUserPassword(email);
        setLoading(false);
        setSuccessMessage("A link has been sent to your email to reset your password."); // Set success message
        setEmail(""); // Clear email input on success
    } catch (err) {
        console.log(err);
        setLoading(false);
        setErrorMessage(`${err}`); // Set error message
    }
  }, [email])

  const submitData = async(event) => {
    event.preventDefault();

    const formValid = await validateData();

    if (formValid === false) {
      return;
    }

    handleSubmit();
  }

  return (
    <div className="container-fluid p-0">
      {loading ? (
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
          <h1 className="h3 mb-3 fw-normal text-center">Reset your password</h1>
          <p className="text-center">A link will be sent to your email address to reset your password.</p>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Enter your email address</label>
          </div>

          {validationErrors.map((item, idx) => (
                <div key={idx} className="my-2 text-start text-danger">{item.message}</div>
          ))}
          
          {successMessage && (
            <div className="my-2 text-start text-success">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="my-2 text-start text-danger">{errorMessage}</div>
          )}

          <button className="btn btn-primary w-100 py-2" type="submit">
            Submit
          </button>

        </form>

        <div className="d-flex justify-content-end my-2">
            <Link to={"/login"} className="text-primary">Go Back</Link>
        </div>
      </main>
    </div>)}
    </div>
  );
};

export default ResetPassword;
