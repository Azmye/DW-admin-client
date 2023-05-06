import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../config/Api';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import { AlertDanger, AlertSuccess } from '../Modal/AlertCollection';

const Login = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/login', form);

      userDispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.role === 'admin') {
        Navigate('/');
      }

      setMessage(<AlertSuccess message="Login Success" />);
    } catch (err) {
      setMessage(<AlertDanger message="Login Failed" />);
      console.log('login failed :', err);
    }
  });
  return (
    <div className=" p-5 bg-zinc-900 rounded-md">
      {message && message}
      <h2 className="text-xl font-bold mb-8">Login to your admin account!</h2>
      <form onSubmit={(e) => handleOnSubmit.mutate(e)} className="w-full">
        <div className="w-full mb-3">
          <input value={email} onChange={handleOnChange} type="email" name="email" id="email" placeholder="Email" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
        </div>
        <div className="w-full mb-3">
          <input value={password} onChange={handleOnChange} type="password" name="password" id="password" placeholder="Password" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
        </div>

        <div className="mt-5">
          <button className="w-full bg-red-700 text-xl px-2 py-1 rounded-md hover:bg-red-900">Login</button>
          <p className="mt-3 text-white/80">Contact the Developer if you don't have an account!</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
