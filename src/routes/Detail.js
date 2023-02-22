import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Home.module.css";
import loadingImg from "./img.gif";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log("a : ", json);
    console.log("json.data.movie : ", json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.home_container}>
      <div>
        {loading ? (
          <div className={styles.loader}>
            <img src={loadingImg} />
          </div>
        ) : (
          <>
            <img className={styles.point_bg} src={movie.background_image} />
            <div className={styles.point_show}>
              <img
                className={styles.point_img}
                src={movie.medium_cover_image}
              />
              <div className={styles.point_textbox}>
                <h1 className={styles.point_title}>
                  <a href={movie.url} target="_blank">
                    {movie.title_long}
                  </a>
                </h1>
                <ul>
                  <li>{`💘 ${movie.like_count}`}</li>
                  <li>장르</li>
                  <ul>
                    {movie.genres.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </ul>
              </div>
            </div>

            <div>{movie.year}</div>
            <div>{movie.description_full}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
