import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
import Login from "../auth/Login";
import { Card, Button } from "react-bootstrap";
import Register from "../auth/Register";
import { getUserCocktails } from "../../actions/cocktail_actions";
import history from "../../history";
const RegisterZone = ({ isAuthenticated, getUserCocktails, location }) => {
  let  flipStatus  = location.state ? location.state.flipStatus : false


  const [isFlipped, setIsFlipped] = useState(flipStatus);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <div
              style={{
                height: "20rem",
                width: "20rem",
                margin: "0 10px 0 10px",
              }}
            >
              <ReactCardFlip
                sty
                isFlipped={isFlipped}
                flipDirection="horizontal"
              >
                <Card
                  style={{
                    height: "20rem",
                    width: "20rem",
                    backgroundColor: "rgba(255, 255, 255, .15)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <h3>
                    <i className="fas fa-cocktail"></i>
                  </h3>
                  <h3>Home Bar</h3>
                  <Login />
                  <br></br>
                  <p>No account? No problem</p>
                  <p onClick={handleClick} style={{fontWeight: "500", color: "lightblue", cursor: "pointer"}}>Sign Up</p>
                </Card>

                <Card
                  style={{
                    height: "20rem",
                    width: "20rem",
                    backgroundColor: "rgba(255, 255, 255, .15)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <h3>
                    <i className="fas fa-cocktail"></i>
                  </h3>
                  <h3>Home Bar</h3>
                  <Register />
                  <br></br>
                  <p>Already have an account?</p>
                  <p onClick={handleClick} style={{fontWeight: "500", color: "lightblue", cursor: "pointer"}}>Login</p>
                </Card>
              </ReactCardFlip>
            </div>
          </div>
        </div>
      </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getUserCocktails })(RegisterZone);
