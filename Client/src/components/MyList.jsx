import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function MyList() {
  const [fetchedMovieListDatas, setFetchedMovieListData] = useState([]);

  useEffect(() => {
    const fetchMovieListInfo = async () => {
      try {
        const response = await axios.get(
          "https://netflix-api-6lk8.onrender.com/user-movie-list"
        );

        setFetchedMovieListData(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchMovieListInfo();
  }, [fetchedMovieListDatas]);

  return (
    <div>
      <Navbar />
      <div className="movie-list-cont">
        {fetchedMovieListDatas.length === 0 ? (
          <p className="no-movie-msg">No movies are added to your list!</p>
        ) : (
          fetchedMovieListDatas.map((fetchedMovieListData, index) => (
            <div className="movie-list-card" key={index}>
              <div className="movie-list-img-cont">
                <img
                  src={`https://image.tmdb.org/t/p/w500${fetchedMovieListData.MovieImgURL}`}
                  alt=""
                />
                <h1>{fetchedMovieListData.MovieTitle}</h1>
              </div>
              <div className="movie-list-descrp-cont">
                <div className="play-btn">
                  <i class="fa-solid fa-play"></i>
                  <p>Play</p>
                </div>

                <div className="movie-list-info-cont">
                  <div>
                    <p>{fetchedMovieListData.MovieLength}</p>
                    <p>{fetchedMovieListData.MovieDate}</p>
                    <div>
                      <p className="hd">HD</p>
                    </div>
                  </div>

                  <div className="genre-cont">
                    {fetchedMovieListData.MovieGenres.map((genre, i) => (
                      <p key={i}>{genre.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
