import axios from "axios";
import { useContext, useState } from "react";
import {
    faBed,
    faCar,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { data, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  console.log(data);

  return (
    <div className="header" style={{display:"block"}}>
    <div style={{display:"flex",paddingTop:"2%"}}>
        <span style={{marginLeft:"13%"}}>BookMySpace</span>
        <div style={{marginRight:"13%",paddingLeft:"57%"}}>
        <button>Login</button>
        <button style={{marginLeft:"15px"}}>SignUp</button>
        </div>
    </div>
        <div className="headerList" style={{marginLeft:"13%",marginTop:"2%"}}>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

    
    <div className="main-block-login">
    <div className="shadow pic-and-login">
      <div className="headline-image">India's Favourite Event Planning Platform</div>
      <div className="full-area-signin">
        <div className="upper-area-signin">
          <form className="block-for-login">
            <div className="margin">
              <p className="form-heading" id="sign-up-sign-in-form">Sign In/Sign Up</p>
              <div className="input-mail-id">
                <img alt="" className="icon"/>
                <input type="text" id="username" placeholder="Enter email or mobile*" name="emailOrPhone"  onChange={handleChange}/>
              </div>
              <div className="input-mail-id">
                <img  alt="" className="icon"/>
                <input type="password" id="password" placeholder="Enter Password" name="name"  onChange={handleChange}/>
              </div>
              <button onClick={handleClick} className="ContinueBtn" >Continue</button>
              {error && <span style={{color:"black"}}>{error.message}</span>}
            </div>
            <div className="OR">
              <hr style={{width:"47%", alignSelf:"center"}} />
              <p className="or-heading" style={{color:"black"}}>OR</p>
              <hr style={{width: "47%", alignSelf:"center"}}/>
            </div>
            <p className="Continue-with-text">Continue With</p>
            <div className="other-logins">
              <div className="social-icons-fb">
                <img id="fb-login-redirect" src="https://images.wedmegood.com/react-frontend-v4/static/media/fbicon.859bed25.svg" alt=""/>
                <p className="facebook-login" style={{color:"black"}}>Facebook</p>
              </div>
              <div className="social-icons-google">
                <img id="gmail-login-redirect" src="https://images.wedmegood.com/react-frontend-v4/static/media/gicon.34be4ec1.svg" alt=""/>
                <p className="google-login" style={{color:"black"}}>Google</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Login;