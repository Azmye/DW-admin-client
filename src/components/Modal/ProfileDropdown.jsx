import { useContext } from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import { MdLogout, MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProfileDropdown = (props) => {
  const [userState, userDispatch] = useContext(UserContext);
  return (
    <div onMouseLeave={props.onMouseLeave} className="absolute bg-zinc-900 top-full mt-4 right-9 p-3 rounded-md text-white">
      <div className="absolute right-2 bottom-[90%]">
        <BsFillTriangleFill size={20} className="text-zinc-900" />
      </div>
      <div>
        <Link className="flex items-center gap-x-2 mb-2">
          <MdOutlinePayments className="text-red-700" size={22} /> <span>Transactions</span>
        </Link>
        <button onClick={() => userDispatch({ type: 'LOGOUT' })} className="flex items-center gap-x-2">
          <MdLogout className="text-red-700" size={22} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
