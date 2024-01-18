import { useState } from "react";
import SuInput4 from "./SuInput4";

function FAQ() {
  const [isAClicked, setIsAClicked] = useState(true);
  const [isBClicked, setIsBClicked] = useState(true);
  const [isCClicked, setIsCClicked] = useState(true);
  const [isDClicked, setIsDClicked] = useState(true);
  const [isEClicked, setIsEClicked] = useState(true);
  const [isFClicked, setIsFClicked] = useState(true);

  function clickA(params) {
    setIsAClicked(!isAClicked);
    setIsBClicked(true);
    setIsCClicked(true);
    setIsDClicked(true);
    setIsEClicked(true);
    setIsFClicked(true);
  }

  function clickB(params) {
    setIsBClicked(!isBClicked);
    setIsAClicked(true);
    setIsCClicked(true);
    setIsDClicked(true);
    setIsEClicked(true);
    setIsFClicked(true);
  }

  function clickC(params) {
    setIsCClicked(!isCClicked);
    setIsAClicked(true);
    setIsBClicked(true);
    setIsDClicked(true);
    setIsEClicked(true);
    setIsFClicked(true);
  }

  function clickD(params) {
    setIsDClicked(!isDClicked);
    setIsAClicked(true);
    setIsCClicked(true);
    setIsBClicked(true);
    setIsEClicked(true);
    setIsFClicked(true);
  }

  function clickE(params) {
    setIsEClicked(!isEClicked);
    setIsAClicked(true);
    setIsCClicked(true);
    setIsDClicked(true);
    setIsBClicked(true);
    setIsFClicked(true);
  }

  function clickF(params) {
    setIsFClicked(!isFClicked);
    setIsAClicked(true);
    setIsCClicked(true);
    setIsDClicked(true);
    setIsEClicked(true);
    setIsBClicked(true);
  }

  return (
    <div className="FAQ">
      <div className="grid-cont">
        <h2 className="FAQ-txt">Frequently Asked Questions</h2>
        <div className="child-cont">
          <div onClick={clickA} className="faq-1st">
            <h2>What is Netflix?</h2>{" "}
          </div>{" "}
          <div
            className="faq-2nda"
            style={{
              maxHeight: isAClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isAClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              Netflix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices. <br /> <br />
              You can watch as much as you want, whenever you want without a
              single commercial – all for one low monthly price. There's always
              something new to discover and new TV shows and movies are added
              every week!
            </p>
          </div>
        </div>
        <div className="child-cont">
          <div onClick={clickB} className="faq-1st">
            <h2>How much does Netflix cost?</h2>
          </div>{" "}
          <div
            className="faq-2ndb"
            style={{
              maxHeight: isBClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isBClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              USD9.99 to USD2.99 a month. No extra costs, no contracts.
            </p>
          </div>
        </div>
        <div className="child-cont">
          <div onClick={clickC} className="faq-1st">
            <h2>Where can i watch?</h2>
          </div>{" "}
          <div
            className="faq-2ndc"
            style={{
              maxHeight: isCClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isCClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              Watch anywhere, anytime. Sign in with your Netflix account to
              watch instantly on the web at netflix.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players and game consoles. <br /> You can also download your
              favorite shows with the iOS, Android, or Windows 10 app. Use
              downloads to watch while you're on the go and without an internet
              connection. Take Netflix with you anywhere.
            </p>
          </div>
        </div>
        <div className="child-cont">
          <div onClick={clickD} className="faq-1st">
            <h2>How do i cancel?</h2>
          </div>{" "}
          <div
            className="faq-2ndd"
            style={{
              maxHeight: isDClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isDClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              Netflix is flexible. There are no pesky contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees – start or stop your
              account anytime.
            </p>
          </div>
        </div>
        <div className="child-cont">
          <div onClick={clickE} className="faq-1st">
            <h2>What can i watch on Netflix?</h2>
          </div>{" "}
          <div
            className="faq-2nde"
            style={{
              maxHeight: isEClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isEClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </p>
          </div>
        </div>
        <div className="child-cont">
          <div onClick={clickF} className="faq-1st">
            <h2>Is Netflix good for kids?</h2>
          </div>{" "}
          <div
            className="faq-2ndf"
            style={{
              maxHeight: isFClicked ? "0" : "1000px",
              overflow: "hidden",
              padding: isFClicked ? 0 : "1.5% 0 ",
              transition: "all 0.5s cubic-bezier(0.5, 0, 0.1, 1) 0s",
            }}
          >
            <p>
              The Netflix Kids experience is included in your membership to give
              parents control while kids enjoy family-friendly TV shows and
              movies in their own space. <br /> Kids profiles come with
              PIN-protected parental controls that let you restrict the maturity
              rating of content kids can watch and block specific titles you
              don’t want kids to see.
            </p>
          </div>
        </div>
        <div className="input-field">
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <div className="faq-form-cont">
              <SuInput4 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
