import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_actions';
import Shelf from './Shelf';
import history from '../../history';
import { clearCocktails } from '../../actions/cocktail_actions';
// import history from '../../history';
const Topbar = (props) => {
  // if(!isAuthenticated){
  //   return <Redirect to="/"/>
  // }
  const handleClick = (e) => {
    const id = e.target.id
    if(id === "/main" || id === "/favorites"){
      props.clearCocktails()
    }
    history.push(e.target.id)
  }
  return props.user ? (
    <Navbar fixed="top" bg="dark" variant="dark" as="ul">
      <Navbar.Brand>
        <Link style={{ color: "white" }} to="/main">
          Home Bar
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as="li" id="/main" onClick={(e) => handleClick(e)}>
          {/* <Link style={{ color: "white" }} to="/main"> */}
          Cocktails
          {/* </Link> */}
        </Nav.Link>
        <Nav.Link as="li" id="/shelf" onClick={(e) => handleClick(e)}>
          {/* <Link style={{ color: "white" }} to="/shelf"> */}
          Shelf
          {/* <p className="hide-sm">Shelf</p>
            <div className="show-sm">
              <Shelf dimension="1.5rem" />
            </div> */}
          {/* </Link> */}
        </Nav.Link>
        <Nav.Link as="li" id="/favorites" onClick={(e) => handleClick(e)}>
          {/* <Link style={{ color: "white" }} to="/favorites"> */}
          Favorites
          {/* <i className="fas fa-star show-sm"></i>
            <p className="hide-sm">Favorites</p> */}
          {/* </Link> */}
        </Nav.Link>
        {/* <Nav.Link as="li"> */}
        {/* <Link style={{ color: "white" }} to="/create"> */}
        {/* Create */}
        {/* <i className="fas fa-star show-sm"></i>
            // <p className="hide-sm">Favorites</p> */}
        {/* </Link> */}
        {/* </Nav.Link> */}
      </Nav>
      <i
        onClick={() => props.logout()}
        style={{ fontSize: "2rem", color: "white" }}
        className="fas fa-sign-out-alt"
      />
    </Navbar>
  ) : (
    <></>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps, { logout, clearCocktails })(Topbar);
