import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import thumbnailCard from '../../assets/img/epsThumbnail.png';
import CardItem from './CardTabItem';
import { useQuery } from 'react-query';
import { API } from '../../config/Api';

const EpisodeTab = (props) => {
  let { data: episodes, isLoading: episodeOnLoad } = useQuery('episodeCache', async () => {
    const response = await API.get(`/episodes`);
    return response.data.data;
  });

  console.log(episodes);
  return (
    <div className={`${props.className} bg-white/80 overflow-hidden rounded-md`}>
      <div className="flex justify-between pb-5">
        <h1 className="font-bold text-xl">Newly Added Episode</h1>
      </div>
      <div className="flex flex-col">{episodes && episodes.map((eps) => <CardItem image={eps.thumbnail} title={eps.title} className="mb-3" />)}</div>
    </div>
  );
};

export default EpisodeTab;
