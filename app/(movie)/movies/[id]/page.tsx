import { Suspense } from "react";
import MovieInfo from "../../../components/movie-info";
import MovieVideos from "../../../components/movie-videos";

interface MovieDetailProps {
  params: {
    id: string;
  };
}

export default function MovieDetail({ params }: MovieDetailProps) {
  const { id } = params;
  return (
    <div>
      <h3>Movie Detail Page</h3>
      <Suspense fallback={<h1>Loading Movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
