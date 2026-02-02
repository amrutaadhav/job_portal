import React from "react";
import Navbar from "../components_lite/Navbar";
import amreshsir from "./amreshsir.jpg";
import ankit from "./Ankit.jpg";
import ritik from "./ritik.jpg";
import gaurav from "./gaurav.jpg";
import "./Creator.css";

const Creator = () => {
  return (
    <div>
      <Navbar />

      {/* Main Section */}
      <div className="creator-container">
        <div className="creator-grid">
          {/* Image Section */}
          <div className="creator-image-wrapper">
            <img
              src={amreshsir}
              alt="Amresh Sir"
              className="creator-main-image"
            />
          </div>

          {/* Text Section */}
          <div className="creator-text">
            <h2>Dr. Amresh Kumar</h2>

            <p>
              Dr. Amresh Kumar completed his{" "}
              <strong>B.Tech in Electronics and Communication Engineering (ECE)</strong>{" "}
              from{" "}
              <strong>
                Shivnand Singh Institution of Technology and Management, Aligarh
              </strong>
              , in <strong>2002</strong>.
            </p>

            <p>
              After graduation, he joined{" "}
              <strong>Koderma Mines Institution</strong> as a{" "}
              <strong>part-time lecturer</strong>. He then pursued his{" "}
              <strong>M.Tech in Electrical Engineering</strong> from{" "}
              <strong>BIT Sindri, Dhanbad</strong>.
            </p>

            <p>
              He was later selected as an{" "}
              <strong>Assistant Professor</strong> in the{" "}
              <strong>ECE Department</strong> at{" "}
              <strong>MIT Muzaffarpur</strong>. During his tenure, he completed his{" "}
              <strong>Ph.D. in Electrical Engineering</strong> from{" "}
              <strong>Bihar University, Muzaffarpur (2016)</strong>.
            </p>

            <p>
              Following his Ph.D., he was transferred to{" "}
              <strong>
                Rashtrakavi Ramdhari Singh Dinkar College of Engineering (RRSDCE)
              </strong>{" "}
              as an{" "}
              <strong>Assistant Professor (EEE Department)</strong>, where he
              continues to serve.
            </p>
          </div>
        </div>
      </div>

      <hr className="creator-divider" />

      {/* Developers Section */}
      <div className="developers-section">
        <h2>Developers and Designers</h2>

        <div className="developers-grid">
          {/* Developer 1 */}
          <a
            href="https://ankitpathak.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="developer-card"
          >
            <img src={ankit} alt="Ankit Pathak" />
            <h3>Ankit Pathak</h3>
            <p>Registration No: 21110125035</p>
            <p>Full Stack Developer</p>
          </a>

          {/* Developer 2 */}
          <a href="#" className="developer-card">
            <img src={ritik} alt="Ritik Shrivastava" />
            <h3>Ritik Shrivastava</h3>
            <p>Registration No: 21110125043</p>
            <p>UI/UX Designer</p>
          </a>

          {/* Developer 3 */}
          <a href="#" className="developer-card">
            <img src={gaurav} alt="Gaurav Kumar" />
            <h3>Gaurav Kumar</h3>
            <p>Registration No: 21110125023</p>
            <p>Research</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Creator;
