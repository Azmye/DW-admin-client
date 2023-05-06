import { useContext, useState } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../../config/Api';
import { AlertDanger, AlertSuccess } from '../AlertCollection';

const CreateCategory = () => {
  const [_, modalDispatch] = useContext(ModalContext);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);

  const handleOnChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify({ name: category });

      const response = await API.post('/category', body, config);

      console.log('succes insert data', response);
      setMessage(<AlertSuccess message="New Category Added!" />);

      modalDispatch({
        type: 'CLOSE_MODAL',
      });
    } catch (err) {
      setMessage(<AlertDanger message="Failed to add category" />);
      console.log('Failed to add category : ', err);
    }
  });
  return (
    <div className="fixed">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 w-full h-[200vh] z-40" onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })}></div>
      <div className="fixed mt-44 ml-96 w-1/2 z-50 bg-zinc-900 p-5 rounded-md">
        {message && message}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-xl text-white">Create New Category+</h2>
        </div>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)} className="w-full">
          <div className="mb-3 flex gap-x-3">
            <input type="text" onChange={handleOnChange} name="category" id="category" placeholder="Category" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
            <button className="text-white font-bold bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-900">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
