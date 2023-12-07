import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import 'material-icons/iconfont/material-icons.css';
import Auth from '../utils/auth';
import logo from '../assets/logo.png';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'
           className="logo">
              <img src={logo} alt="main logo" height="90px"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/' className='d-none d-lg-block'>
                Search For Videos
              </Nav.Link>
              {/* if user is logged in show saved videos*/}
              {Auth.loggedIn() ? (
                <>
                  <a className = "nav-link d-none d-lg-block" href='/saved'>
                    Your Videos
                  </a>
                  <Nav.Link onClick={Auth.logout} className='d-none d-lg-block'>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} className='d-none d-lg-block'>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='tabs'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};


{/* <header className="header-area header-wrapper">
      {/* header-top-bar */}
//       <div className="header-top-bar">
//         <div className="container-fluid">
//           <div className="top-row">
//             <div className="col-lg-12 col-md-12 m1-auto d-flex justify-content-end">
//                 <ul className="link">
//                   <li>
//                     <a href={LoginForm}>
//                       Login 
//                     </a>
//                   </li>
//                   <li>
//                     <a href={SignUpForm}>
//                       Sign Up
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       {/* header-middle-area */}
//       <div id="sticky-header" className="header-middle-area">
//         <div className="container-fluid">
//           <div className="full-width-mega-dropdown">
//             <div className="row">
//               {/* logo */}
//               <div className="col-lg-2 col-md-4">
//                 <div className="logo">
//                   <a href="index.html">
//                     <img src={logo} alt="main logo" height="100px"/>
//                   </a>
//                 </div>
//               </div>
//               {/* primary-menu */}
//               <div className="col-lg-10 d-none d-lg-block" id="menu">
//                 <Navbar bg="light" expand="lg">
//                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                   <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mr-auto justify-content-center">
//                       <Nav.Link href="index.html">Home</Nav.Link>
//                       <Nav.Link as={Link} to='/SearchVideos.jsx'>Search Videos</Nav.Link>
//                       <Nav.Link href="savedvideos.html">Saved Videos</Nav.Link>
//                     </Nav>
//                   </Navbar.Collapse>
//                 </Navbar>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* START MOBILE MENU AREA */}
//       <div className="mobile-menu-area d-block d-lg-none section">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="mobile-menu">
//                 <Navbar bg opacity="0" expand="lg">
//                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                   <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav>
//                       <Nav.Link href="index.html">Home</Nav.Link>
//                       <Nav.Link href="search.html">Search Videos</Nav.Link>
//                       <Nav.Link href="savedvideos.html">Saved Videos</Nav.Link>
//                     </Nav>
//                   </Navbar.Collapse>
//                 </Navbar>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* END MOBILE MENU AREA */}
//     </header>
//   );
// }; */}

export default AppNavbar;