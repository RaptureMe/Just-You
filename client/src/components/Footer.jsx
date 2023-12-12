import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Envelope, Github } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <>
      <section className="footerArea bg-light py-5">
        <div className="footerContainer">
          <div className="row">
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 logoContainer">
              <div className="footer-logo">
                <a href="#">
                  <img src={logo} alt="justyou logo" height="100px" width="100" />
                </a>
              </div>
            </div>
            <div className="tagline col-lg-3 col-md-6">
                <i>
                  JustYou. <br></br>
                  Your favorite videos. <br></br>
                  Your way.
                </i>
              
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <div className="footer-navigation">
                <h5 className="title">LINKS</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/SearchVideos" className="text-decoration-none text-dark">
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link to="/AboutUs" className="text-decoration-none text-dark">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <div className="footer-navigation">
                <h5 className="title">ACCOUNT</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/LoginForm" className="text-decoration-none text-dark">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/SignupForm" className="text-decoration-none text-dark">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div className="footer-widget-info">
                <h5 className="title">STAY CONNECTED</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      <Envelope /> support@justyou.com
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      <Github /> GitHub Repo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-copyright d-flex align-items-center justify-content-center py-3 bg-dark text-light">
        <div className="container">
          <p className="m-0">Copyright © 2023 JustUs. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
