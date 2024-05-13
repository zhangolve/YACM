const Card = ({ title, content, onClick }) => {
  return (
    <div
      // hover effect
      className="mx-auto bg-white rounded-xl shadow-md overflow-hidden card p-4 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <h2>{title}</h2>
      {content}
    </div>
  );
};

export default Card;
