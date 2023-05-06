import EpisodeTab from '../components/Home/EpisodeTab';
import Hero from '../components/Home/Hero';
import MoviesTab from '../components/Home/MoviesTab';
import ShowsTab from '../components/Home/ShowsTab';
import TransactionsTab from '../components/Home/TransactionTab';

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <div className="flex gap-x-5 px-5 pb-5">
        <MoviesTab className={'p-5 w-1/3'} />
        <TransactionsTab className={'p-5 w-2/3'} />
      </div>
      <div className="flex gap-x-5 px-5 pb-10">
        <ShowsTab className={'p-5 w-2/5'} />
        <EpisodeTab className={'p-5 w-3/5'} />
      </div>
    </div>
  );
};

export default Home;
