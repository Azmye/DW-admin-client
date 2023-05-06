import CardPageItem from '../CardPageItem';
import thumbnail from '../../assets/img/thumbnail.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const ShowsPageLists = () => {
  const navigate = useNavigate();
  let { data: shows, isLoading: movieOnLoad } = useQuery('showsCache', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  return (
    <div className="bg-zinc-900 p-5 rounded-md">
      <div className="text-white flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Shows</h2>
        <button className="bg-red-700 px-2 py-1 rounded-md" onClick={() => navigate('/show-form-create')}>
          Create New+
        </button>
      </div>
      <div className="flex flex-wrap mx-auto">
        {shows && shows.filter((filteredShow) => filteredShow.category.name == 'TV Shows').map((show) => <CardPageItem to={`/show-form-update/${show.id}`} image={show.thumbnail} title={show.title} />)}
      </div>
    </div>
  );
};

export default ShowsPageLists;
