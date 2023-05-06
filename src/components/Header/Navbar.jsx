import navBrand from '../../assets/img/nav-brand.png';
import adminAvatar from '../../assets/img/admin-default-avatar.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DropdownContext } from '../../context/DropdownContext';
import ProfileDropdown from '../Modal/ProfileDropdown';
import CreateEps from '../Modal/EpisodeForm/CreateEps';
import { EpisodeContext } from '../../context/EpisodeContext';
import { UserContext } from '../../context/UserContext';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { ModalContext } from '../../context/ModalContext';
import CreateCategory from '../Modal/CategoryForm/CreateCategory';

const Navbar = () => {
  const [dropdownState, dropdownDispatch] = useContext(DropdownContext);
  const [epsState, epsDispatch] = useContext(EpisodeContext);
  const [userState, userDispatch] = useContext(UserContext);
  const [modalState, modalDispatch] = useContext(ModalContext);
  return (
    <>
      <nav className="bg-zinc-900 fixed top-0 left-0 right-0 z-30 shadow-xl">
        <div className="container mx-auto flex justify-between items-center py-3 relative lg:px-8">
          {userState.isLogin ? (
            <div className="flex text-white gap-x-2">
              <Link to={'/'}>Home</Link>
              <Link to={'/Movies'}>Movies</Link>
              <Link to={'/Shows'}>TV Shows</Link>
            </div>
          ) : null}
          <img src={navBrand} alt="Dumbflix" className={`${userState.isLogin ? 'mr-40' : ''}`} />

          {userState.isLogin != true ? (
            <button className="bg-red-700 text-white font-semibold px-2 py-1 flex items-center gap-x-2 rounded-md">
              <span>Go to User Website</span> <BsFillArrowRightSquareFill />
            </button>
          ) : null}

          {userState.isLogin ? <img className="w-10 h-10 rounded-full" onMouseEnter={() => dropdownDispatch({ type: 'PROFILE_DROPDOWN_OPEN' })} src={adminAvatar} alt="Rounded avatar"></img> : null}
          {/* Profile Dropdown */}
          {dropdownState.isProfileDropdown ? <ProfileDropdown onMouseLeave={() => dropdownDispatch({ type: 'PROFILE_DROPDOWN_CLOSE' })} /> : null}

          {/* Create episode Modal */}
          {epsState.isCreateEps ? <CreateEps /> : null}

          {/* Create category Modal */}
          {modalState.isCreateCategory ? <CreateCategory /> : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
