import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AlertDanger, AlertSuccess } from './Modal/AlertCollection';
import { API } from '../config/Api';
import { ModalContext } from '../context/ModalContext';

const CreateItemForm = (props) => {
  const [modalState, modalDispatch] = useContext(ModalContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    year: '',
    thumbnail: '',
    category_id: '',
    link: '',
    description: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  let { data: categories, isLoading: categoryOnLoad } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('image', form.thumbnail[0], form.thumbnail[0].name);
      formData.set('title', form.title);
      formData.set('year', form.year);
      formData.set('link', 'imd.com');
      formData.set('desc', form.description);
      formData.set('category_id', form.category_id);

      const response = await API.post('/film', formData, config);
      console.log('add movie success', response);
      setMessage(<AlertSuccess message="Success add film" />);
      navigate('/');
    } catch (err) {
      e.preventDefault();
      console.log('add movie failed', err);
      setMessage(<AlertDanger message="Failed to add film" />);
    }
  });

  return (
    <div className={`px-8 pt-3 pb-5 text-white ${props.className}`}>
      <div className="bg-zinc-900 p-3 rounded-md">
        {message && message}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-5">{props.title}</h2>
          <div className="flex gap-x-3">
            <button onClick={() => modalDispatch({ type: 'CREATE_CATEGORY_OPEN' })} className="px-4 py-2 bg-red-700 rounded-md hover:bg-red-900">
              add category
            </button>
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex gap-x-5 w-full mb-3">
            <input onChange={handleOnChange} type="text" name="title" id="title" placeholder="Title" className="w-3/5 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-700 border-none" />
            <input onChange={handleOnChange} className="w-2/5 text-sm text-white border-none rounded-lg cursor-pointer bg-zinc-800 focus:outline-none file:bg-red-700" id="thumbnail" name="thumbnail" type="file"></input>
          </div>
          <div className="mb-3">
            <input onChange={handleOnChange} type="text" name="year" id="year" placeholder="Year" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
          </div>
          <div className="mb-3 ">
            <select
              onChange={handleOnChange}
              value={form.category_id}
              disabled={categoryOnLoad}
              name="category_id"
              id="category_id"
              className="w-full rounded-md bg-zinc-800 text-gray-500 focus:text-white focus:ring-2 focus:ring-red-700 border-none"
            >
              <option value="default" className="hidden">
                Categories
              </option>
              {categories &&
                categories.map((category, id) => (
                  <option value={category.id} key={id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <textarea onChange={handleOnChange} name="description" id="description" placeholder="Description" className="w-full rounded-md text-white bg-zinc-800 h-32 focus:ring-2 focus:ring-red-700 border-none"></textarea>
          </div>
          <div className="text-right mt-3">
            <button className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-900">{props.btnTitle}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemForm;
