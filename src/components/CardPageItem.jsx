import { Link } from 'react-router-dom';

const CardPageItem = (props) => {
  return (
    <Link to={props.to} className="w-1/6 p-5 text-white hover:bg-zinc-700 cursor-pointer rounded-md">
      <img src={props.image} alt="" className="mb-2" />
      <p>{props.title}</p>
    </Link>
  );
};

export default CardPageItem;
