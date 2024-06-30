import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ChatState } from "./Context/ChatProvider"

import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Button from 'react-bootstrap/esm/Button';

import '../components/Effects/neonBorder.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logos from "../img/siteLogo.jpg"




 

const NavBar = () => 
{

  const history = useHistory();

  const gotoChats = () => {
    
    history.push("/chats");
  };

 

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("myID");
    localStorage.removeItem("editEmail");
    history.push("/");
  };
 
 
    

  return (
    
    <Navbar className='neon-border-black' collapseOnSelect expand="lg"  style={{background:"rgba(0,0,150,0.4)",position:"sticky" ,top:"0",zIndex:"100",backdropFilter:"blur(10px)",width:"100%"}}>
      <Navbar.Brand href="#home">
      <img
        src={logos}
        width="50"
        height="50"
        className="d-inline-block align-top ms-4"
        alt="React Bootstrap logo"
        style={{borderRadius:"100px"}}
      />
    </Navbar.Brand>
    <Navbar.Brand href="#home" style={{fontFamily:"monospace",fontSize:"28px",color:"white"}}>Gamer's Vista</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        
      </Nav>
      <Nav>
        <Nav.Link href="/main" style={{fontFamily:"monospace",fontSize:"22px",color:"white",marginRight:"4px"}}>Main</Nav.Link>
        <Nav.Link href="/feeds" style={{fontFamily:"monospace",fontSize:"22px",color:"white",marginRight:"4px"}}>Feeds</Nav.Link>
        <Nav.Link href="/search" style={{fontFamily:"monospace",fontSize:"22px",color:"white",marginRight:"4px"}}>Search</Nav.Link>
        <Button onClick={logoutHandler} className='neon-border' variant="outline-danger" style={{borderRadius:"20px"}}>Abort Session</Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  
  )
}

export default NavBar


