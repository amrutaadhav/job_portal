import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2024 Sunfire Sensei. All rights reserved.</p>

      <p>
        Powered by{" "}
        <a
          href="https://github.com/ankitpathak62"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ankit Pathak
        </a>
      </p>

      <p className="footer-links">
        <Link to="/PrivacyPolicy">Privacy Policy</Link> |
        <Link to="/TermsofService"> Terms of Service</Link>
      </p>
    </div>
  );
};

export default Footer;
