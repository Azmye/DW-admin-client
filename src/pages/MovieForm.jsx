import { useQuery } from 'react-query';
import videoThumbnail from '../assets/img/epsThumbnail.png';
import CreateItemForm from '../components/CreateItemForm';
import MoviePreview from '../components/Movies/MoviePreview';
import UpdateMovie from '../components/Movies/UpdateMovie';
import { API } from '../config/Api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const MovieForm = (props) => {
  const { id: movieId } = useParams();

  let { data: movie, isLoading: categoryOnLoad } = useQuery('movieCache', async () => {
    const response = await API.get(`/film/${movieId}`);
    return response.data.data;
  });

  useEffect(() => {
    movie && console.log(movie);
  }, [movie]);

  return props.isCreateMovie ? (
    <CreateItemForm className="mt-20" title="Create Movie" btnTitle="Create Movie" />
  ) : (
    <>
      {movie && <MoviePreview movieId={movieId} title={movie.title} year={movie.year} category={movie.category.name} desc={movie.description} />}
      <UpdateMovie className="mt-3" />
    </>
  );
};

export default MovieForm;
