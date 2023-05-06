const UpdateMovie = (props) => {
  return (
    <div className={`px-8 pt-3 pb-5 text-white ${props.className}`}>
      <div className="bg-zinc-900 p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold mb-5">Update Movie</h2>
          <div className="flex gap-x-3">
            <button className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-900">Update</button>
          </div>
        </div>
        <form>
          <div className="flex gap-x-5 w-full mb-3">
            <input type="text" name="title" id="title" placeholder="Title" className="w-3/5 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-700 border-none" />
            <input className="w-2/5 text-sm text-white border-none rounded-lg cursor-pointer bg-zinc-800 focus:outline-none file:bg-red-700" id="thumbnail" name="thumbnail" type="file"></input>
          </div>
          <div className="mb-3">
            <input type="text" name="year" id="year" placeholder="Year" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
          </div>
          <div className="mb-3">
            <select name="category_id" id="category_id" className="w-full rounded-md bg-zinc-800 text-gray-500 focus:text-white focus:ring-2 focus:ring-red-700 border-none">
              <option value="default" className="hidden">
                Categories
              </option>
              <option value="1">Movies</option>
              <option value="2">TV Shows</option>
            </select>
          </div>
          <div>
            <textarea name="description" id="description" placeholder="Description" className="w-full rounded-md text-white bg-zinc-800 h-32 focus:ring-2 focus:ring-red-700 border-none"></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
