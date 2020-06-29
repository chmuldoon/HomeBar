import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
import Login from "../auth/Login";
import { Card, Button } from "react-bootstrap";
import Register from "../auth/Register";
const Landing = ({ isAuthenticated }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  if (isAuthenticated) {
    return <Redirect to="/main" />;
  } else {

    return (
      !isAuthenticated && (
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
                    <Button onClick={handleClick}>SignUp</Button>
                  </Card>

                  <Card
         
                    style={{
                      height: "20rem",
                      width: "20rem",
                      backgroundColor: "rgba(255, 255, 255, .15)",
                      backdropFilter: "blur(5px)"
                    }}
                  >
                    <h3>
                      <i className="fas fa-cocktail"></i>
                    </h3>
                    <h3>Home Bar</h3>
                    <Register />
                    <Button onClick={handleClick}>Login</Button>
                  </Card>
                </ReactCardFlip>
              </div>
            </div>
          </div>
        </section>
      )
    );
  };
  }
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, null)(Landing);
