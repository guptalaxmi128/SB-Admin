import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer- mt30 mb30">
                <a href="#">
                  <img src="images/common/white-logo.png" alt="logo" />
                </a>
              </div>
              <p>
                Pora is a smarter auto insurance company. We save you money by
                only talking to you about insurance in moments that matter.
              </p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="mt30 mb30 text-w">Contact Us</h4>
              <ul className="footer-address-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 123 Business Centre
                  London SW1A 1AA
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>{" "}
                  <a href="tel:+91123-456-7890">+91 123-456-7890 </a>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>{" "}
                  <a href="mailto:info@businessname.com">
                    info@businessname.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="mt30 mb30 text-w">Keep in Touch </h4>
              <div className="footer-social-media-icons">
                <a href="#" target="_blank" className="facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" target="_blank" className="twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" target="_blank" className="instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" target="_blank" className="linkedin">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-ft">
                  <p>
                    Copyright © 2024 Swasti Bharat. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
