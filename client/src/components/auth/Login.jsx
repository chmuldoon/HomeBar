import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth_actions";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
const Login = ({ demoLogin, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  //this allows onChange to be used for all our inputs
  // [e.target.name] will set the key equal to the name of the target name tag if that wasnt obvious
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        {/* <InputGroup className="mb-3">
          <InputGroup.Prepend >
            <InputGroup.Text  id="basic-addon1">
              Email
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          />
        </InputGroup> */}
        <div className="form-group">
          <label>Email:</label>
          <input
            className="frosted"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </Fragment>
  );
};
Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);