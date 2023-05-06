import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import CardItem from './CardTabItem';
import thumbnailCard from '../../assets/img/thumbnail.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';
const MoviesTab = (props) => {
  const navigate = useNavigate();

  let { data: movies, isLoading: movieOnLoad } = useQuery('moviesCache', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  return (
    <div className={`${props.className} bg-slate-300 overflow-hidden rounded-md`}>
      <div className="flex justify-between pb-5">
        <h1 className="font-bold text-xl">Movies</h1>
        <div className="flex gap-1">
          <button className="bg-black text-white rounded-sm px-2 hover:bg-white hover:text-slate-900" title="Create New Movie" onClick={() => navigate('/movie-form-create')}>
            Create New+
          </button>
          <button title="All Movie">
            <BsFillArrowRightSquareFill className="hover:text-white" size={26} />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {movies && movies.slice(0, 2).map((movie) => <CardItem key={movie.id} linkTo={`/movie-form-update/${movie.id}`} image={movie.thumbnail} title={movie.title} desc={movie.description} className="mb-3" />)}
      </div>
    </div>
  );
};

export default MoviesTab;
