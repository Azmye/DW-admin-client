import { MdDelete } from 'react-icons/md';
import EpisodesPreview from '../EpisodesPreview';
import { useContext } from 'react';
import { EpisodeContext } from '../../context/EpisodeContext';
import ReactPlayer from 'react-player';
import thumbPlaceholder from '../../assets/img/auth_background.jpg';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/Api';
import { useNavigate } from 'react-router-dom';

const MoviePreview = (props) => {
  const [epsState, epsDispatch] = useContext(EpisodeContext);
  const navigate = useNavigate();

  let { data: episode, isLoading: episodeOnLoad } = useQuery('episodeCache', async () => {
    const response = await API.get(`/film/${props.movieId}/episode`);
    return response.data.data;
  });

  const handleOnDelete = useMutation(async (movieId) => {
    try {
      await API.delete(`/film/${movieId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="px-8 pt-24">
      <div className="bg-zinc-900 p-3 rounded-md flex gap-x-5">
        <div className="w-3/5 relative h-[500px]">
          {episode &&
            episode.map((eps) => (
              <ReactPlayer
                key={eps.id}
                width={'100%'}
                height={'100%'}
                className="absolute top-0 left-0"
                url={eps.linkFilm}
                light={<img src={eps.thumbnail ? eps.thumbnail : thumbPlaceholder} alt="" className="w-full h-[500px] mx-auto" />}
              />
            ))}
        </div>
        <div className="text-white w-2/5">
          <div className="flex justify-between items-center">
            <h2 className="text-6xl font-bold mb-3">{props.title}</h2>
            <button onClick={() => handleOnDelete.mutate(props.movieId)} title="Delete Movie" className="flex bg-black items-center h-10 gap-x-1 px-3 rounded-md hover:bg-zinc-800">
              <span className="text-red-700">Delete</span>
              <MdDelete className="text-red-700" size={26} />
            </button>
          </div>
          <p className="mb-3 text-white/80">{props.desc}</p>
          <div className="flex items-center gap-x-3 mb-3">
            <p>{props.year}</p>
            <p className="border rounded-md p-1">{props.category}</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Episodes</h2>
              <button onClick={() => epsDispatch({ type: 'CREATE_EPS_OPEN' })} className="bg-blue-700 px-2 py-1 rounded-md hover:bg-blue-900">
                New Episode+
              </button>
            </div>
            <EpisodesPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
