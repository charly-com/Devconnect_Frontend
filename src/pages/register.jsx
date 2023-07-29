import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import logo from "../images/logo.png";

const applogo = {
  height: "3em",
  width: "5em",
  mixBlendMode: "multiply",
};


const Register = () => {
    const {auth, alert} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = { firstName: "", lastName: "", email: "", password: "",  gender: "male" };
     const [userData, setUserData] = useState(initialState);
     const { firstName, lastName, email, password } = userData;

     const [typePass, setTypePass] = useState(false);
     

    useEffect(() => {
      if (auth.token) navigate.push("/");
    }, [auth.token, navigate]);

    

    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(register(userData));
    };


    return (
        <div className="auth_page">
        <form onSubmit={handleSubmit} className="inner-shadow">
          <h3 className="text-uppercase text-center mb-4 auth-heading">
          <img src={logo} alt="" style={applogo}/>
          </h3>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <div className="outer-shadow hover-in-shadow form-input-wrap">
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={handleChangeInput}
                value={firstName}
                name="firstName"
                style={{ background: `${alert.firstName ? "#fd2d6a14" : ""} ` }}
              />
            </div>
            <small className="form-text text-danger">
              {alert.firstName ? alert.firstName : ""}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <div className="outer-shadow hover-in-shadow form-input-wrap">
              <input
                type="text"
                className="form-control"
                id="lastName"
                onChange={handleChangeInput}
                value={lastName}
                name="lastName"
                style={{ background: `${alert.lastName ? "#fd2d6a14" : ""} ` }}
              />
            </div>
            <small className="form-text text-danger">
              {alert.lastName ? alert.lastName : ""}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="outer-shadow hover-in-shadow form-input-wrap">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChangeInput}
                value={email}
                name="email"
                style={{ background: `${alert.email ? "#fd2d6a14" : ""} ` }}
              />
            </div>
            <small className="form-text text-danger">
              {alert.email ? alert.email : ""}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="pass">
              <div className="outer-shadow hover-in-shadow form-input-wrap">
                <input
                  type={typePass ? "text" : "password"}
                  className="form-control"
                  id="password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                  style={{
                    background: `${alert.password ? "#fd2d6a14" : ""} `,
                  }}
                />
                <small onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </small>
              </div>
            </div>
            <small className="form-text text-danger">
              {alert.password ? alert.password : ""}
            </small>
          </div>


          <div className="d-flex justify-content-evenly  mx-0 mb-1">
            <label htmlFor="male">
              Male:
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                defaultChecked
                onChange={handleChangeInput}
              />
            </label>

            <label htmlFor="female">
              Female:
              <input
               type="radio"
               id="female"
               name="gender"
               value="female"
                onChange={handleChangeInput}
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn-1 w-100 d-flex outer-shadow hover-in-shadow justify-content-center"
          >
            Register
          </button>
          <p className="my-2">
            Already have an account?{" "}
            <Link to="/" style={{ color: "crimson" }}>
              Login Now.
            </Link>
          </p>
        </form>
      </div>
    )
};

export default Register;

