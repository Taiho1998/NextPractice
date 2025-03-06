import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../components/movie-info";
import MovieVideos from "../../../components/movie-videos";

interface ParamProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: ParamProps) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default function MovieDetail({ params: { id } }: ParamProps) {
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
