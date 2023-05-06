import { useQuery } from 'react-query';
import EpisodeThumbnail from '../assets/img/epsThumbnail.png';
import CardEpisodeItem from './CardEpisodeItem';
import { API } from '../config/Api';
import { useLocation } from 'react-router-dom';

const EpisodesPreview = () => {
  let location = useLocation();
  let movieId = location.pathname.split('/')[2];

  let { data: episodes, isLoading: episodeOnLoad } = useQuery('episodeCache', async () => {
    const response = await API.get(`/film/${movieId}/episode`);
    return response.data.data;
  });

  return <div className="h-72 overflow-y-scroll">{episodes && episodes.map((episode) => <CardEpisodeItem key={episode.id} title={episode.title} image={episode.thumbnail} />)}</div>;
};

export default EpisodesPreview;
