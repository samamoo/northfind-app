import React from 'react';
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
// import './Navigation.scss';

export default function Navigation () {
  return (
    <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="/">NorthFind Assessment Tool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Clients</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Interview Questions</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Edit Clients</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Edit Interview Questions</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#">Start New Interview</Nav.Link>
          <Nav.Link href="#">Profile</Nav.Link>
          <Nav.Link href="/login">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}