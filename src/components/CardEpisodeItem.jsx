const CardEpisodeItem = (props) => {
  return (
    <div className="flex gap-x-3 p-2 rounded-md hover:bg-zinc-800">
      <img src={props.image} alt="" className="w-1/3" />
      <div className="w-2/3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{props.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardEpisodeItem;
