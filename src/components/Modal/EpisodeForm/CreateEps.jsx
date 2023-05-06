import { useContext, useState } from 'react';
import { EpisodeContext } from '../../../context/EpisodeContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ModalContext } from '../../../context/ModalContext';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../../config/Api';
import { AlertDanger, AlertSuccess } from '../AlertCollection';

const CreateEps = () => {
  const [_, epsDispatch] = useContext(EpisodeContext);
  let location = useLocation();
  let movieId = location.pathname.split('/')[2];

  const [modalState, modalDispatch] = useContext(ModalContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    thumbnail: '',
    linkFilm: '',
    film_id: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      console.log(form);

      const formData = new FormData();
      formData.set('image', form.thumbnail[0], form.thumbnail[0].name);
      formData.set('title', form.title);
      formData.set('linkfilm', form.linkFilm);
      formData.set('film_id', movieId);

      const response = await API.post('/episode', formData, config);
      console.log('add episode success', response);
      setMessage(<AlertSuccess message="Success add episode" />);

      epsDispatch({ type: 'CLOSE_MODAL' });
    } catch (err) {
      e.preventDefault();
      console.log('add episode failed', err);
      setMessage(<AlertDanger message="Failed to add episode" />);
    }
  });

  return (
    <div className="fixed">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 w-full h-[200vh] z-40" onClick={() => epsDispatch({ type: 'CLOSE_MODAL' })}></div>
      <div className="fixed mt-44 ml-96 w-1/2 z-50 bg-zinc-900 p-5 rounded-md">
        {message && message}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-xl text-white">Create New Episode+</h2>
        </div>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)} className="w-full">
          <div className="flex gap-x-5 w-full mb-3">
            <input value={form.title} onChange={handleOnChange} type="text" name="title" id="title" placeholder="Title" className="w-3/5 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-700 border-none" />
            <input onChange={handleOnChange} className="w-2/5 text-sm text-white border-none rounded-lg cursor-pointer bg-zinc-800 focus:outline-none file:bg-red-700" id="thumbnail" name="thumbnail" type="file"></input>
          </div>
          <div className="mb-3">
            <input value={form.linkFilm} onChange={handleOnChange} type="text" name="linkFilm" id="linkFilm" placeholder="Video Link" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
          </div>
          <div className="text-right">
            <button className="text-white font-bold bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-900">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEps;
