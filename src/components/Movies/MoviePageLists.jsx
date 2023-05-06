import CardPageItem from '../CardPageItem';
import thumbnail from '../../assets/img/thumbnail.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const MoviePageLists = () => {
  const navigate = useNavigate();
  let { data: movies, isLoading: movieOnLoad } = useQuery('moviesCache', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  return (
    <div className="bg-zinc-900 p-5 rounded-md">
      <div className="text-white flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Movies</h2>
        <button className="bg-red-700 px-2 py-1 rounded-md" onClick={() => navigate('/movie-form-create')}>
          Create New+
        </button>
      </div>
      <div className="flex flex-wrap mx-auto">
        {movies && movies.filter((filteredMovie) => filteredMovie.category.name == 'Movies').map((movie) => <CardPageItem to={`/movie-form-update/${movie.id}`} image={movie.thumbnail} title={movie.title} />)}
      </div>
    </div>
  );
};

export default MoviePageLists;
