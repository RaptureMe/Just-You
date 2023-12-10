// import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Envelope, Github } from 'react-bootstrap-icons';


const Footer = () => {
    return (
        <>
            <section className="footerArea">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about-widget">
                                <div className="footerLogo">
                                    <a href="#">
                                        <img src={logo} alt="justyou logo" height="100px" width="100"/>
                                    </a>
                                </div>
                                <p>
                                    JustYou. <br></br>
                                    Your favorite videos. <br></br>
                                    Your way.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="footer-navigation">
                                <h6 className="title">Links</h6>
                                <ul>
                                    <li>
                                        <Link to="/SearchVideos">Search</Link>
                                        </li>
                                        <li>
                                        <Link to="/AboutUs">About Us</Link>
                                        </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-navigation">
                                <h6 className="title">Account</h6>
                                <ul>
                                    <li>
                                        <Link to="/LoginForm">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/SignupForm">Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget-info">
                                <h6 className="title">Stay Connected</h6>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <Envelope /> support@justyou.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Github  /> GitHub Repo
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer-copyright d-flex align-items-center justify-content-between pt-35">
                                <div className="copyright-text">
                                    <p>Copyright © 2023 JustUs. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;
