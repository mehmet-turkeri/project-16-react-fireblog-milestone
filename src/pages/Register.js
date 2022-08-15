import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../assets/blok.png";
import { FcGoogle } from "react-icons/fc";
import { createUser, signUpProvider } from "../helpers/firebase";

const Register = () => {
  // Formdaki herbir girdimiz icin bir State olusturacagim.
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const displayName = `${firstName} ${lastName}`;
  createUser(email, password, navigate, displayName);
}

const handleProviderLogin = () => {
  signUpProvider(navigate);
};
  return (
    <div className="register m-auto p-3 mt-3 bg-light rounded-3">
      <div className="text-center">
        <img src={Blog} alt="blog" className="blog-img" />
      </div>
      <h2 className="text-center">REGISTER</h2>
      <form className="text-center m-auto p-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label fw-bold">
            FIRST NAME
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"            
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label fw-bold">
            LAST NAME
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"            
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label fw-bold">
            EMAIL
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"            
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label fw-bold">
            PASSWORD
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            required
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="submit" className="btn btn-secondary d-flex align-items-center justify-content-center" onClick={handleProviderLogin}>
            With Google  &nbsp; <span className="fs-4 d-flex align-items-center"><FcGoogle/></span>
          </button>

        </div>
      </form>
    </div>
  );
};
export default Register;