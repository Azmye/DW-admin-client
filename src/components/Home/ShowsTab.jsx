import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import CardItem from './CardTabItem';
import thumbnailCard from '../../assets/img/thumbnail.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const ShowsTab = (props) => {
  let { data: shows, isLoading: movieOnLoad } = useQuery('moviesCache', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  const navigate = useNavigate();
  return (
    <div className={`${props.className} bg-slate-500 overflow-hidden rounded-md`}>
      <div className="flex justify-between pb-5 text-white">
        <h1 className="font-bold text-xl">TV Shows</h1>
        <div className="flex gap-1">
          <button className="bg-white text-slate-500 font-semibold rounded-sm px-2 hover:bg-zinc-900" title="Create New Movie" onClick={() => navigate('/shows-form-create')}>
            Create New+
          </button>
          <button title="All Movie">
            <BsFillArrowRightSquareFill className="hover:text-zinc-900" size={26} />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {shows &&
          shows.filter((show) => show.category.name == 'TV Shows').map((show) => <CardItem key={show.id} linkTo={`/movie-form-update/${show.id}`} image={show.thumbnail} title={show.title} desc={show.description} className="mb-3" />)}
      </div>
    </div>
  );
};

export default ShowsTab;
