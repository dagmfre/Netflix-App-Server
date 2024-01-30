import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainPage() {
  const api_key = process.env.REACT_APP_TMDB_API_KEY;
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [movieImageUrls, setMovieImageUrls] = useState([]);
  const [movieImageUrls2, setMovieImageUrls2] = useState([]);
  const [movieImageUrls3, setMovieImageUrls3] = useState([]);
  const [videoKeyCont, setVideoKeyCont] = useState([]);
  const [videoKeyCont2, setVideoKeyCont2] = useState([]);
  const [videoKeyCont3, setVideoKeyCont3] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [allowHover, setAllowHover] = useState(false);

  const [overviewCont, setOverviewCont] = useState("");
  const [overviewCont2, setOverviewCont2] = useState("");
  const [overviewCont3, setOverviewCont3] = useState("");

  const [lengthCont, setLengthCont] = useState("");
  const [lengthCont2, setLengthCont2] = useState("");
  const [lengthCont3, setLengthCont3] = useState("");

  const [dateCont, setDateCont] = useState("");
  const [dateCont2, setDateCont2] = useState("");
  const [dateCont3, setDateCont3] = useState("");
  const [genreCont, setGenreCont] = useState("");

  const [selectedKey, setSelectedKey] = useState("");
  const [selectedKey2, setSelectedKey2] = useState("");
  const [selectedKey3, setSelectedKey3] = useState("");

  const [selectedOverview, setSelectedOverview] = useState("");
  const [selectedOverview2, setSelectedOverview2] = useState("");
  const [selectedOverview3, setSelectedOverview3] = useState("");

  const [selectedLength, setSelectedLength] = useState("");
  const [selectedLength2, setSelectedLength2] = useState("");
  const [selectedLength3, setSelectedLength3] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  const [selectedDate3, setSelectedDate3] = useState("");

  const [selectedGenres, setSelectedGenres] = useState("");

  const navigate = useNavigate();
  const updateSlicingRangeRef = useRef();
  const updateSlicingRangeRef2 = useRef();
  const updateSlicingRangeRef3 = useRef();

  const videoNode = useRef(null);
  const player = useRef(null);
  const initialized = useRef(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // trancating(cutting) description text if it's longer than 100 words
  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  setTimeout(() => {
    setAllowHover(true);
  }, 5000);

  const handleImageHover = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentKey = videoKeyCont[outerIndex][imageIndex];
      setSelectedKey(currentKey);

      const currentOverview = overviewCont[outerIndex][imageIndex];
      setSelectedOverview(currentOverview);

      const currentlength = lengthCont[outerIndex][imageIndex];
      setSelectedLength(currentlength);

      const currentDate = dateCont[outerIndex][imageIndex];
      setSelectedDate(currentDate);
    }
  };

  const handleImageHover2 = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentKey2 = videoKeyCont2[outerIndex][imageIndex];
      setSelectedKey2(currentKey2);

      const currentOverview2 = overviewCont2[outerIndex][imageIndex];
      setSelectedOverview2(currentOverview2);

      const currentlength2 = lengthCont2[outerIndex][imageIndex];
      setSelectedLength2(currentlength2);
      const currentDate2 = dateCont2[outerIndex][imageIndex];
      setSelectedDate2(currentDate2);
    }
  };

  const handleImageHover3 = (outerIndex, imageIndex) => {
    if (allowHover) {
      const currentKey3 = videoKeyCont3[outerIndex][imageIndex];
      setSelectedKey3(currentKey3);

      const currentOverview3 = overviewCont3[outerIndex][imageIndex];
      setSelectedOverview3(currentOverview3);

      const currentlength3 = lengthCont3[outerIndex][imageIndex];
      setSelectedLength3(currentlength3);

      const currentDate3 = dateCont3[outerIndex][imageIndex];
      setSelectedDate3(currentDate3);
    }
  };

  const handleMouseEnter = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[0].classList.add("slider-hovered");
    const layeredSliders = document.querySelector(".layered");
    layeredSliders.classList.add(".layered-zindex");
  };

  const handleMouseLeave = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[0].classList.remove("slider-hovered");
    // const layeredSliders = document.querySelector(".layered");
    // layeredSliders.classList.remove(".layered-zindex");
  };

  const handleMouseEnter2 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[1].classList.add("slider-hovered");
  };

  const handleMouseLeave2 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[1].classList.remove("slider-hovered");
  };
  const handleMouseEnter3 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[2].classList.add("slider-hovered");
  };

  const handleMouseLeave3 = () => {
    const slickSliders = document.querySelectorAll(".slick-slider");
    slickSliders[2].classList.remove("slider-hovered");
  };

  useEffect(() => {
    // Redirect unauthorized user back to auth-netflix-account page
    if (location.state) {
      setUsername(location.state.data);
    } else {
      navigate("/auth-netflix-account");
    }
    // Fetching form TMDB API
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&append_to_response=videos`
      )
      .then((response) => {
        const randomNumber = Math.floor(Math.random() * 20);
        const backdropPaths = response.data.results.map((movie) => {
          return movie.backdrop_path;
        });

        // #111111111111111
        const videoIds = response.data.results.map((movie) => {
          return movie.id;
        });

        // movie detail retrieving
        const fetchMovieDetails = async () => {
          const promises = videoIds.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails()
          .then((result) => {
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            // const genres = result.map((movie) => movie?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 6);
                // const slicedUrlsGN2 = genres.slice(7, 13);
                // const slicedUrlsGN3 = genres.slice(13, 19);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 4);
                // const slicedUrlsGN2 = genres.slice(5, 9);
                // const slicedUrlsGN3 = genres.slice(10, 14);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 3);
                // const slicedUrlsGN2 = genres.slice(5, 8);
                // const slicedUrlsGN3 = genres.slice(10, 13);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 2);
                // const slicedUrlsGN2 = genres.slice(5, 7);
                // const slicedUrlsGN3 = genres.slice(10, 12);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails = async () => {
          const promises = videoIds.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);
            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // 11111111111111111111

        const updateSlicingRange = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls([...imageUrlCont]);
          }
        };

        updateSlicingRange();
        updateSlicingRangeRef.current = updateSlicingRange;
        window.addEventListener("resize", updateSlicingRange);
        setDescription(response.data.results[randomNumber].overview);
        setTitle(response.data.results[randomNumber].title);

        // Fetching video from TMDB API then inserting video key into videojs-youtube
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${response.data.results[randomNumber].id}/videos?api_key=${api_key}`
            // https://api.themoviedb.org/3/movie/787699?
          )
          .then((response) => {
            // inserting video key into videojs-youtube
            if (videoNode.current && !initialized.current) {
              initialized.current = true; //prevent duplicate initialization
              player.current = videojs(videoNode.current, {
                ...{
                  controls: true,
                  fluid: true,
                  controlBar: {
                    volumePanel: {
                      inline: false,
                    },
                  },
                },
                ...{
                  autoplay: true,
                  muted: true,
                  fluid: true,
                  loop: true,
                  rel: false,
                  sources: [
                    {
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${response.data.results[0].key}`,
                    },
                  ],
                },
              }).ready(function () {
                console.log("Player Ready");
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
      .then((response) => {
        const backdropPaths = response.data.results.map(
          (movie) => movie.backdrop_path
        );

        // #22222222222222222222222
        const videoIds2 = response.data.results.map((movie) => {
          return movie.id;
        });

        // movie detail retrieving
        const fetchMovieDetails2 = async () => {
          const promises = videoIds2.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails2()
          .then((result) => {
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            // const genres = result.map((movie) => movie?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 6);
                // const slicedUrlsGN2 = genres.slice(7, 13);
                // const slicedUrlsGN3 = genres.slice(13, 19);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont2([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 4);
                // const slicedUrlsGN2 = genres.slice(5, 9);
                // const slicedUrlsGN3 = genres.slice(10, 14);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont2([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 3);
                // const slicedUrlsGN2 = genres.slice(5, 8);
                // const slicedUrlsGN3 = genres.slice(10, 13);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont2([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont2([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont2([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont2([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 2);
                // const slicedUrlsGN2 = genres.slice(5, 7);
                // const slicedUrlsGN3 = genres.slice(10, 12);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont2([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails2 = async () => {
          const promises = videoIds2.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails2()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont2([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // #22222222222222222222222222

        const updateSlicingRange2 = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls2([...imageUrlCont]);
          }
        };

        updateSlicingRange2();
        updateSlicingRangeRef2.current = updateSlicingRange2;
        window.addEventListener("resize", updateSlicingRange2);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`)
      .then((response) => {
        const backdropPaths = response.data.results.map(
          (movie) => movie.backdrop_path
        );

        // 33333333333333333333
        const videoIds3 = response.data.results.map((movie) => {
          return movie.id;
        });
        // movie detail retrieving

        const fetchMovieDetails3 = async () => {
          const promises = videoIds3.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}?api_key=${api_key}`
              );
              return response;
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchMovieDetails3()
          .then((result) => {
            const overview = result.map((movie) => movie.data?.overview);
            const runtime = result.map((movie) => movie.data?.runtime);
            const date = result.map((movie) => movie.data?.release_date);
            // const genres = result.map((movie) => movie?.genres);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 6);
                const slicedUrlsOV2 = overview.slice(7, 13);
                const slicedUrlsOV3 = overview.slice(13, 19);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 6);
                const slicedUrlsLG2 = runtime.slice(7, 13);
                const slicedUrlsLG3 = runtime.slice(13, 19);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 6);
                const slicedUrlsDT2 = date.slice(7, 13);
                const slicedUrlsDT3 = date.slice(13, 19);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 6);
                // const slicedUrlsGN2 = genres.slice(7, 13);
                // const slicedUrlsGN3 = genres.slice(13, 19);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setGenreCont([...GNcont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 4);
                const slicedUrlsOV2 = overview.slice(5, 9);
                const slicedUrlsOV3 = overview.slice(10, 14);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 4);
                const slicedUrlsLG2 = runtime.slice(5, 9);
                const slicedUrlsLG3 = runtime.slice(10, 14);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 4);
                const slicedUrlsDT2 = date.slice(5, 9);
                const slicedUrlsDT3 = date.slice(10, 14);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 4);
                // const slicedUrlsGN2 = genres.slice(5, 9);
                // const slicedUrlsGN3 = genres.slice(10, 14);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 3);
                const slicedUrlsOV2 = overview.slice(5, 8);
                const slicedUrlsOV3 = overview.slice(10, 13);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 3);
                const slicedUrlsLG2 = runtime.slice(5, 8);
                const slicedUrlsLG3 = runtime.slice(10, 13);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 3);
                const slicedUrlsDT2 = date.slice(5, 8);
                const slicedUrlsDT3 = date.slice(10, 13);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 3);
                // const slicedUrlsGN2 = genres.slice(5, 8);
                // const slicedUrlsGN3 = genres.slice(10, 13);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              } else if (window.innerWidth < 450) {
                // slicing overview
                const slicedUrlsOV1 = overview.slice(0, 2);
                const slicedUrlsOV2 = overview.slice(5, 7);
                const slicedUrlsOV3 = overview.slice(10, 12);

                const OVcont = [
                  [...slicedUrlsOV1],
                  [...slicedUrlsOV2],
                  [...slicedUrlsOV3],
                ];
                setOverviewCont3([...OVcont]);

                // slicing length
                const slicedUrlsLG1 = runtime.slice(0, 2);
                const slicedUrlsLG2 = runtime.slice(5, 7);
                const slicedUrlsLG3 = runtime.slice(10, 12);

                const LGcont = [
                  [...slicedUrlsLG1],
                  [...slicedUrlsLG2],
                  [...slicedUrlsLG3],
                ];
                setLengthCont3([...LGcont]);

                // slicing date
                const slicedUrlsDT1 = date.slice(0, 2);
                const slicedUrlsDT2 = date.slice(5, 7);
                const slicedUrlsDT3 = date.slice(10, 12);

                const DTcont = [
                  [...slicedUrlsDT1],
                  [...slicedUrlsDT2],
                  [...slicedUrlsDT3],
                ];
                setDateCont3([...DTcont]);

                // slicing genre
                // const slicedUrlsGN1 = genres.slice(0, 2);
                // const slicedUrlsGN2 = genres.slice(5, 7);
                // const slicedUrlsGN3 = genres.slice(10, 12);

                // const GNcont = [
                //   [...slicedUrlsGN1],
                //   [...slicedUrlsGN2],
                //   [...slicedUrlsGN3],
                // ];
                // setOverviewCont([...GNcont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // video-key retrieving
        const fetchVideoDetails3 = async () => {
          const promises = videoIds3.map(async (videoId) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${api_key}`
              );
              return response.data.results[0];
            } catch (error) {
              console.error(
                `Error fetching data for video ID ${videoId}:`,
                error
              );
              return null;
            }
          });

          const videoDetails = await Promise.all(promises);
          return videoDetails;
        };

        fetchVideoDetails3()
          .then((result) => {
            const videoKeys = result.map((movie) => movie?.key);

            const updateSlicingRange = () => {
              if (window.innerWidth > 1141) {
                // Adjust the range difference to 4 if window width is below 1141px
                const slicedUrls1 = videoKeys.slice(0, 6);
                const slicedUrls2 = videoKeys.slice(7, 13);
                const slicedUrls3 = videoKeys.slice(13, 19);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
                const slicedUrls1 = videoKeys.slice(0, 4);
                const slicedUrls2 = videoKeys.slice(5, 9);
                const slicedUrls3 = videoKeys.slice(10, 14);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 800 && window.innerWidth > 450) {
                const slicedUrls1 = videoKeys.slice(0, 3);
                const slicedUrls2 = videoKeys.slice(5, 8);
                const slicedUrls3 = videoKeys.slice(10, 13);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              } else if (window.innerWidth < 450) {
                const slicedUrls1 = videoKeys.slice(0, 2);
                const slicedUrls2 = videoKeys.slice(5, 7);
                const slicedUrls3 = videoKeys.slice(10, 12);

                const imageUrlCont = [
                  [...slicedUrls1],
                  [...slicedUrls2],
                  [...slicedUrls3],
                ];
                setVideoKeyCont3([...imageUrlCont]);
              }
            };

            updateSlicingRange();
            updateSlicingRangeRef.current = updateSlicingRange;
            window.addEventListener("resize", updateSlicingRange);
          })
          .catch((error) => {
            console.error("Error fetching video details:", error);
          });

        // 333333333333333333333333333

        const updateSlicingRange3 = () => {
          if (window.innerWidth > 1141) {
            // Adjust the range difference to 4 if window width is below 1141px
            const slicedUrls1 = backdropPaths.slice(0, 6);
            const slicedUrls2 = backdropPaths.slice(7, 13);
            const slicedUrls3 = backdropPaths.slice(13, 19);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 1140 && window.innerWidth > 800) {
            const slicedUrls1 = backdropPaths.slice(0, 4);
            const slicedUrls2 = backdropPaths.slice(5, 9);
            const slicedUrls3 = backdropPaths.slice(10, 14);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 800 && window.innerWidth > 450) {
            const slicedUrls1 = backdropPaths.slice(0, 3);
            const slicedUrls2 = backdropPaths.slice(5, 8);
            const slicedUrls3 = backdropPaths.slice(10, 13);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          } else if (window.innerWidth < 450) {
            const slicedUrls1 = backdropPaths.slice(0, 2);
            const slicedUrls2 = backdropPaths.slice(5, 7);
            const slicedUrls3 = backdropPaths.slice(10, 12);

            const imageUrlCont = [
              [...slicedUrls1],
              [...slicedUrls2],
              [...slicedUrls3],
            ];
            setMovieImageUrls3([...imageUrlCont]);
          }
        };

        updateSlicingRange3();
        updateSlicingRangeRef3.current = updateSlicingRange3;
        window.addEventListener("resize", updateSlicingRange3);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      window.removeEventListener(
        "resize",
        updateSlicingRangeRef.current,
        updateSlicingRangeRef2.current,
        updateSlicingRangeRef3.current
      );
      if (player.current) {
        player.current.dispose();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-page">
      <div className="main-child1">
        <Navbar />
        <div className="cover"></div>
        <video ref={videoNode} className="video-js" />
        <div className="movie-descr-cont">
          <h1>{title}</h1>
          <p className="movie-descr">{truncate(description, 150)}</p>
          <div className="descr-btn-cont">
            <div>
              <i class="fa-solid fa-play"></i>
              <p>Play</p>
            </div>
            <div>
              <img src="info.png" alt="" />
              <p>More Info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-child2">
        <h1>Popular Movies</h1>
        <h1>Now Playing</h1>
        <h1>Upcoming</h1>
        <Slider {...settings}>
          {movieImageUrls.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div key={imageIndex} className="cards">
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`hovered-card`}
                  >
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i class="fa-solid fa-circle-play"></i>
                          <i class="fa-solid fa-circle-plus"></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i class="fa-solid fa-circle-chevron-down"></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>2h 19m</p>
                          <p>2023</p>
                          <p>HD</p>
                        </div>

                        <li>
                          <ul>Action</ul>
                          <ul>Adventure</ul>
                          <ul>Science Fiction</ul>{" "}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    className="main-movie-img"
                    onMouseEnter={() =>
                      handleImageHover(outerIndex, imageIndex)
                    }
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
        <div className="layered"></div>
        <Slider {...settings}>
          {movieImageUrls2.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div key={imageIndex} className="cards">
                  <div
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                    className={`hovered-card`}
                  >
                    <div>
                      <img
                        onMouseEnter={() =>
                          handleImageHover2(outerIndex, imageIndex)
                        }
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i class="fa-solid fa-circle-play"></i>
                          <i class="fa-solid fa-circle-plus"></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i class="fa-solid fa-circle-chevron-down"></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>2h 19m</p>
                          <p>2023</p>
                          <p>HD</p>
                        </div>

                        <li>
                          <ul>Action</ul>
                          <ul>Adventure</ul>
                          <ul>Science Fiction</ul>{" "}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    onMouseEnter={() =>
                      handleImageHover2(outerIndex, imageIndex)
                    }
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
        <div className="layered"></div>
        <Slider {...settings}>
          {movieImageUrls3.map((ImageUrlsCont, outerIndex) => (
            <div key={outerIndex} className="card-cont">
              {ImageUrlsCont.map((movieImageUrl, imageIndex) => (
                <div
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                  key={imageIndex}
                  className="cards"
                >
                  <div className={`hovered-card `}>
                    <div>
                      <img
                        onMouseEnter={() =>
                          handleImageHover3(outerIndex, imageIndex)
                        }
                        src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="icons-cont">
                        <div>
                          <i class="fa-solid fa-circle-play"></i>
                          <i class="fa-solid fa-circle-plus"></i>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </div>

                        <i class="fa-solid fa-circle-chevron-down"></i>
                      </div>
                      <div className="info-cont">
                        <div>
                          <p>2h 19m</p>
                          <p>2023</p>
                          <p>HD</p>
                        </div>

                        <li>
                          <ul>Action</ul>
                          <ul>Adventure</ul>
                          <ul>Science Fiction</ul>{" "}
                        </li>
                      </div>
                    </div>
                  </div>
                  <img
                    onMouseEnter={() =>
                      handleImageHover3(outerIndex, imageIndex)
                    }
                    src={`https://image.tmdb.org/t/p/w500${movieImageUrl}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
      {/* <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${selectedKey}?autoplay=1&mute=1&loop=1&rel=0"`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube video"
      /> */}
    </div>
  );
}
