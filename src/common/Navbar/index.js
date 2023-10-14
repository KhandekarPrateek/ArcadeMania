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
  NavbarToggler,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navbarToggle = () => {
    setToggle((oldToggle) => !oldToggle);
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="px-2">
          <Link to="/">ArcadeMania</Link>
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            navbarToggle();
          }}
        />
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
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
