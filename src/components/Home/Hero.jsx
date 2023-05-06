import mainBg from '../../assets/img/main-bg.png';
import { Link } from 'react-router-dom';

const Hero = (props) => {
  return (
    <div className="p-5">
      <div className="hero relative h-[600px] w-full rounded-md overflow-hidden">
        <img src={mainBg} alt="" className="object-cover w-full h-[600px]" />
        <div className="absolute left-0 right-0 top-0 bottom-0 px-28 pt-20">
          <div className="text-white">
            <h1 className="text-5xl mb-3">Newly Added!</h1>
            <p className="text-8xl mb-2 w-1/2">The Witcher</p>
            <p className="mb-2 w-1/2">Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.</p>
            <div className="flex gap-2 mb-5">
              <p>2019</p>
              <p className="border border-1 px-2 rounded-md">TV Shows</p>
            </div>
            <div className="flex gap-x-3">
              <Link className="bg-red-700 px-4 py-2 rounded-md">Create New ?</Link>
              <Link className="bg-green-700 px-8 py-2 rounded-md">Update</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
