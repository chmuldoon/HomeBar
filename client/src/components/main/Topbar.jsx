import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_actions';
import Shelf from './Shelf';
import history from '../../history';
import { clearCocktails } from '../../actions/cocktail_actions';
import { useEffect } from 'react';
import { fetchWell } from '../../actions/ingredient_actions';
// import history from '../../history';
const Topbar = (props) => {
  // if(!isAuthenticated){
  //   return <Redirect to="/"/>
  // }
  useEffect(() => {
    props.fetchWell()
  },[])
  const handleClick = (e) => {
    const id = e.target.id
    if(props.location.pathname !== e.target.id){
      history.push(e.target.id)
    }
  }
  const navInfo = [["/main", "Cocktails"],["/shelf", "Shelf"],["/favorites", "Favorites"]]
  const renderNavItems = info => {
    return info.map((el, i) => {
      const url = el[0];
      const title = el[1];
      const underline = url == props.location.pathname ? "underline" : "none";
      return (
        <Nav.Link
          style={{
            cursor: "pointer",
            color: "white",
            textDecoration: underline
          }}
          as="li"
          id={url}
          key={i}
          onClick={(e) => handleClick(e)}
        >
          {title}
        </Nav.Link>
      );
    })
  }
  return props.user ? (
    <Navbar fixed="top" bg="dark" variant="dark" as="ul">
      <Navbar.Brand
        style={{ color: "white", cursor: "pointer" }}
        id="/main"
        onClick={(e) => handleClick(e)}
      >
        {/* <Link style={{ color: "white" }} to="/main"> */}
        Home Bar
        {/* </Link> */}
      </Navbar.Brand>
      <Nav className="mr-auto">{renderNavItems(navInfo)}</Nav>
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
export default connect(mapStateToProps, { logout, clearCocktails, fetchWell })(Topbar);
