import Login from '../components/auth/Login';
import AuthBg from '../assets/img/auth_background.jpg';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.isLogin) {
      navigate('/');
    }
  }, [userState]);

  return (
    <div className="w-full mt-20 px-8 container text-white">
      <div className="fixed -z-10 top-0 left-0 right-0 bottom-0 backdrop-blur-md bg-white/30">
        <img src={AuthBg} alt="" className="bg" />
        <div className="fixed  top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-white/30"></div>
      </div>
      <div className="flex justify-between py-44">
        <div className="w-96 mx-auto">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Auth;
