import React from 'react';
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import './Navigation.scss';

export default function Navigation (props) {

  return (
    <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
      <img id="logo" src="/img/logo.png" alt="north-find logo"/>
      <Navbar.Brand href="/">NorthFind Assessment Tool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {props.state.loggedIn ?
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin-dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="/admin-interviews">Interview Sessions</NavDropdown.Item>
            <NavDropdown.Item href="/admin-client">Clients</NavDropdown.Item>
            <NavDropdown.Item href="/admin-questions">Interview Questions</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/admin-client">Edit Clients</NavDropdown.Item>
            <NavDropdown.Item href="/admin-questions">Edit Interview Questions</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/clientform">Start New Interview</Nav.Link>
          <Nav.Link href="/login" onClick={props.logout}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      :
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/login" >Log In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      }
    </Navbar>
  )
}