import React from "react";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { AiFillLinkedin, AiFillHeart } from "react-icons/ai";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const Footer = () => {
  const [toggle, setToggle] = useState(false);
  const Footertoggle = (oldToggle) => {
    setToggle((oldToggle) => !oldToggle);
  };

  return (
    <div className="justify-content-center d-flex">
      <Navbar color="light" light expand="md">
        <NavbarText className="px-3">
          Made with <AiFillHeart size={30} style={{ fill: "red" }} /> by Prateek
          Khandekar
        </NavbarText>
        <NavbarToggler onClick={Footertoggle} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://www.linkedin.com/in/prateek-khandekar-54966824b/">
                <AiFillLinkedin size={30} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/KhandekarPrateek">
                <SiGithub size={30} />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Footer;
