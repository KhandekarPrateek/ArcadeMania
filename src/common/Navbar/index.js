import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  NavbarText,
} from "reactstrap";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const NavbarToggler = (oldToggle) => {
    setToggle(!oldToggle);
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="px-2">
          <Link to="/">MegaGame</Link>
        </NavbarBrand>
        <NavbarToggler onClick={NavbarToggler} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="px-2">
              <Link to="HangMan">Hangman</Link>
            </NavItem>

            <NavItem className="px-2">
              <Link to="MemesGame">MemesGame</Link>
            </NavItem>
            <NavItem className="px-2">
              <Link to="Tenzies">Tenzies</Link>
            </NavItem>

            <UncontrolledDropdown nav inNavbar></UncontrolledDropdown>
          </Nav>
          <NavbarText className="px-2">Simple Text</NavbarText>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
