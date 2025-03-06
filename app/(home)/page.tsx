import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL: string =
  "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovie() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function Homepage() {
  const movies = await getMovie();
  return (
    <div>
      {movies.map((movie) => (
        <li>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
