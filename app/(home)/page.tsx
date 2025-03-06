import Movie from "../components/movie";
import style from "../../styles/home.module.css";
import { API_URL } from "../constants";
export const metadata = {
  title: "Home",
};

async function getMovie() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function Homepage() {
  const movies = await getMovie();
  return (
    <div className={style.container}>
      {movies.map(
        (movie: { id: string; title: string; poster_path: string }) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        )
      )}
    </div>
  );
}
