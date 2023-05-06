import { MdDelete } from 'react-icons/md';
import EpisodesPreview from '../EpisodesPreview';
import { useContext } from 'react';
import { EpisodeContext } from '../../context/EpisodeContext';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const ShowPreview = (props) => {
  const [epsState, epsDispatch] = useContext(EpisodeContext);

  let { data: episode, isLoading: episodeOnLoad } = useQuery('episodeCache', async () => {
    const response = await API.get(`/film/${props.movieId}/episode`);
    return response.data.data;
  });

  return (
    <div className="px-8 pt-24">
      <div className="bg-zinc-900 p-3 rounded-md flex gap-x-5">
        <img src={props.thumbnail} alt="" className="w-3/5" />
        <div className="text-white w-2/5">
          <div className="flex justify-between items-center">
            <h2 className="text-6xl font-bold mb-3">{props.title}</h2>
            <button title="Delete Movie" className="flex bg-black items-center h-10 gap-x-1 px-3 rounded-md hover:bg-zinc-800">
              <span className="text-red-700">Delete</span>
              <MdDelete className="text-red-700" size={26} />
            </button>
          </div>
          <p className="mb-3">{props.desc}</p>
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

export default ShowPreview;
