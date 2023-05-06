import { Link } from 'react-router-dom';
const CardTabItem = (props) => {
  return (
    <Link to={props.linkTo} className={`flex flex-col items-center bg-transparent rounded-lg shadow-md md:flex-row md:w-full hover:bg-gray-100 dark:hover:bg-gray-700 ${props.className}`}>
      <img className="object-cover w-full rounded-t-lg h-96 md:h-52 md:w-2/5 md:rounded-none md:rounded-l-lg" src={props.image} alt="" />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.desc}</p>
      </div>
    </Link>
  );
};

export default CardTabItem;
