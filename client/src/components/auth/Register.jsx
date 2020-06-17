import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth_actions";
import { Button, Form } from "react-bootstrap";
const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  //this allows onChange to be used for all our inputs
  // [e.target.name] will set the key equal to the name of the target name tag if that wasnt obvious
  const onChange = (e) => {
    debugger
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    debugger
    register(email, password);
  };
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

    </Fragment>
  );
};
Register.propType = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
