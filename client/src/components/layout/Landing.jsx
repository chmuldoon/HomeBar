import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
import Login from "../auth/Login";
import { Card, Button } from "react-bootstrap";
import Register from "../auth/Register";
import { getUserCocktails } from "../../actions/cocktail_actions";
import history from "../../history";
const Landing = ({ isAuthenticated, getUserCocktails }) => {
  // const [isFlipped, setIsFlipped] = useState(false);
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setIsFlipped(!isFlipped);
  // };

 
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
                <h5>The Ultimate Cocktail Assistant</h5>
                <br></br>
                <Link
                  to={{ pathname: "/register", state: { flipStatus: false } }}
                >
                  <Button>Login</Button>
                </Link>
                <br></br>
                ─────── or ───────
                <br></br>
                <br></br>
                <Link
                  to={{ pathname: "/register", state: { flipStatus: true } }}
                >
                  <Button>Sign Up</Button>
                </Link>
              </Card>
              {/* <ReactCardFlip
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
                </ReactCardFlip> */}
            </div>
          </div>
        </div>
      </section>
    );
};
  
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {getUserCocktails})(Landing);
