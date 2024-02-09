import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate;
  const [isTogglerClicked, setIsTogglerClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSearchClicked2, setIsSearch2Clicked] = useState(false);
  const [isWindowWidthReached, setIsWindowWidthReached] = useState(false);

  const setClickHandler = () => {
    setIsTogglerClicked(!isTogglerClicked);
  };
  const searchClickHandler = () => {
    setIsSearchClicked(!isSearchClicked);
  };
  const searchClickHandler2 = () => {
    setIsSearch2Clicked(!isSearchClicked2);
  };

  const handleNavlink = () => {
    navigate("/main-page", { state: { data: "pseudo-data" } });
  };

  const windowWidthHandler = () => {
    if (window.innerWidth < 750) {
      setIsWindowWidthReached(false);
    } else {
      setIsWindowWidthReached(true);
    }
  };

  useEffect(() => {
    windowWidthHandler();
    window.addEventListener("resize", windowWidthHandler);

    return () => {
      window.removeEventListener("resize", windowWidthHandler);
    };
  }, []);

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid nav-cont">
          <div className="nav-child1">
            <Link className="navbar-brand" to="/">
              <img className="logo logo1" src="logo.png" alt="" />
            </Link>
            <div className="nav-child2a">
              <div className="navlist-cont">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to="/main-page"
                      onClick={handleNavlink}
                      className="nav-link"
                    >
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/main-page"
                      onClick={handleNavlink}
                      className="nav-link"
                    >
                      Tv Shows
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-list">
                      My List
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            style={{ display: isTogglerClicked ? "flex" : "none" }}
            className="collapse-cont"
          >
            <div className="search-cont search-cont2">
              <i
                onClick={searchClickHandler2}
                className="fa-solid fa-magnifying-glass"
              ></i>
              <input
                className={`search ${isSearchClicked2 ? "search-open2" : ""}`}
                type="search"
              />
            </div>
            <Link to="/main-page" onClick={handleNavlink}>
              Movies
            </Link>
            <Link to="/main-page" onClick={handleNavlink}>
              Tv Shows
            </Link>
            <Link to="/my-list">My List</Link>
          </div>
          <div>
            <div className="nav-child3">
              <div className="search-cont">
                <i
                  onClick={searchClickHandler}
                  style={{ display: isWindowWidthReached ? "flex" : "none" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
                <input
                  type="search"
                  className={`search ${isSearchClicked ? "search-open" : ""}`}
                />
              </div>
              <img src="avatar.png" alt="" />
            </div>
            <div
              style={{
                display: isWindowWidthReached ? "none" : "flex",
                cursor: "pointer",
              }}
              className="toggler-cont"
              onClick={setClickHandler}
            >
              <img src="menu.png" alt="" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
