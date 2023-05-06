import { useParams } from 'react-router-dom';
import videoThumbnail from '../assets/img/epsThumbnail.png';
import CreateItemForm from '../components/CreateItemForm';
import ShowPreview from '../components/Shows/ShowPreview';
import UpdateShow from '../components/Shows/UpdateShow';
import { useQuery } from 'react-query';
import { API } from '../config/Api';
import MoviePreview from '../components/Movies/MoviePreview';
import { useEffect } from 'react';

const ShowForm = (props) => {
  const { id: movieId } = useParams();

  let { data: show, isLoading: categoryOnLoad } = useQuery('showCache', async () => {
    const response = await API.get(`/film/${movieId}`);
    return response.data.data;
  });

  useEffect(() => {
    show && console.log(show);
  }, [show]);

  return props.isCreateMovie ? (
    <CreateItemForm className="mt-20" title="Create Show" btnTitle="Create Show" />
  ) : (
    <>
      {show && <MoviePreview movieId={movieId} title={show.title} year={show.year} category={show.category.name} desc={show.description} />}
      <UpdateShow className="mt-3" />
    </>
  );
};

export default ShowForm;
