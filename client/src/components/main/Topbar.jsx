import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_actions';
import Shelf from './Shelf';
const Topbar = ({ logout, user }) => {
    //   <Link to="/shelf">
    //     <Shelf style={{ hover: "cursor" }} />
    //   </Link>
    //   <Link to="/favorites">
    //     <i class="fas fa-star"></i>
    //   </Link>

    //   <Link to="/main">
    //     <i class="fas fa-cocktail"></i>
    //   </Link>

    //   <a onClick={logout} href="#!">
    //     <i className="fas fa-sign-out-alt" />
    //   </a>
  return user ? (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/main">Home Bar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">
          <Link style={{ color: "white" }} to="/main">
            Cocktails
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link style={{ color: "white" }} to="/shelf">
            Shelf
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link style={{ color: "white" }} to="/favorites">
            Favorites
          </Link>
        </Nav.Link>
      </Nav>
      <i
        onClick={() => logout()}
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
    user: state.auth.user
  }
}
export default connect(mapStateToProps, { logout })(Topbar);
