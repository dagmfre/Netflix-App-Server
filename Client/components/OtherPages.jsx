import React from "react";
import FAQ from "./FAQ";
import LanguageIcon from "@mui/icons-material/Language";

function OtherPages() {
  return (
    <div className="other-pages">
      <div className="info1">
        <div className="enjoy-cont">
          <h2>Enjoy on your TV</h2>
          <p>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        <div className="img-cont">
          <img src="tv.png" alt="" />
          <video className="info1-vid" src="media/div1-vid.m4v" autoPlay loop muted></video>
        </div>
      </div>
      <div className="info2">
        <div className="img2-cont">
          <img src="mobile.jpg" alt="" />
          <div className="img2-child">
            <img className="ST-img" src="ST-cover-img.png" alt="" />
            <div className="info2-text">
              <h4>Stranger Things</h4>
              <p>Downloading...</p>
            </div>
            <img className="down-icon" src="download-icon.gif" alt="" />
          </div>
        </div>
        <div className="info2-2ndchild">
          <h2>Download your shows to watch offline</h2>
          <p>Save your favorites easily and always have something to watch.</p>
        </div>
      </div>
      <div className="info3">
        <div className="info3-txt-cont">
          <h2>Watch everywhere</h2>
          <p>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div className="img3-child">
          <img src="div3-pic.png" alt="" />
          <video src="div3-vid.m4v" autoPlay muted loop></video>
        </div>
      </div>
      <div className="info4">
        <div className="info4-div">
          <img src="child-img.png" alt="" />
        </div>
        <div className="info4-div2">
          <h2>Create profiles for children</h2>
          <p>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
      </div>
      <FAQ />
      <div className="footer">
        <div className="ft1">
          <a href="javascript:void(0);">Questions? Contact us.</a>
          <div>
            <a href="javascript:void(0);">FAQ</a>
            <a href="javascript:void(0);">Investor Relations</a>
          <a className="b1" href="javascript:void(0);">Media Center</a>
            <a href="javascript:void(0);">Privacy</a>
            <a href="javascript:void(0);">Speed Test</a>
          </div>
          <div className="lang-cont">
            <select>
              <option value="option_value1">English</option>
            </select>
            <LanguageIcon fontSize="small" />
          </div>
        </div>
        <div className="ft2">
          <a href="javascript:void(0);">Help Center</a>
          <a href="javascript:void(0);">Jobs</a>
          <a className="b2" href="javascript:void(0);">Terms of Use</a>
          <a href="javascript:void(0);">Cookie Preferences</a>
          <a href="javascript:void(0);">Legal Notices</a>
        </div>
        <div className="ft3">
          <a href="javascript:void(0);">Account</a>
          <a href="javascript:void(0);">Ways to Watch</a>
          <a className="b3" href="javascript:void(0);">Contact Us</a>
          <a href="javascript:void(0);">Corporate Information</a>
          <a href="javascript:void(0);">Only On Netflix</a>
        </div>
        <div className="ft4">
          <a className="a1" href="javascript:void(0);">Media Center</a>
          <a className="a2" href="javascript:void(0);">Terms of Use</a>
          <a className="a3" href="javascript:void(0);">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default OtherPages;
