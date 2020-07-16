import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
import Login from "../auth/Login";
import { Card, Button } from "react-bootstrap";
import Register from "../auth/Register";
import { getUserCocktails } from "../../actions/cocktail_actions";
import history from "../../history";
import { login } from "../../actions/auth_actions";
import AnimateItem from "../main/AnimateItem";
const Landing = ({ isAuthenticated, getUserCocktails, login }) => {
  // const [isFlipped, setIsFlipped] = useState(false);
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setIsFlipped(!isFlipped);
  // };
  if(isAuthenticated){
    return <Redirect to="/main" />;
  }
 
    return (
      <section className="landing">
        <title>Home Bar</title>

        <div className="dark-overlay">
          <div className="landing-inner">
            <div
              style={{
                height: "58vh",
                width: "30vw",
                margin: "0 10px 0 10px",
              }}
            >
                  <Card
                    style={{
                      height: "58vh",
                      width: "30vw",
                      backgroundColor: "rgba(255, 255, 255, .15)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    <br></br>
                    <h3>
                      <i className="fas fa-cocktail"></i>
                    </h3>
                    <h3>Home Bar</h3>
                    <h5>The Ultimate Cocktail Assistant</h5>
                    <br></br>
                    <Link
                      to={{
                        pathname: "/register",
                        state: { flipStatus: false },
                      }}
                    >
                      <Button>Login</Button>
                    </Link>
                    <br></br>
                    ─────── or ───────
                    <br></br>
                    <br></br>
                    <Link
                      to={{
                        pathname: "/register",
                        state: { flipStatus: true },
                      }}
                    >
                      <Button>Sign Up</Button>
                    </Link>
                    <br></br>
                    ─────── or ───────
                    <br></br>
                    <br></br>
                    <div>
                      <Button
                        onClick={() => login("demo@demo.com", "password")}
                      >
                        Demo Login
                      </Button>
                    </div>
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
export default connect(mapStateToProps, {getUserCocktails, login})(Landing);
