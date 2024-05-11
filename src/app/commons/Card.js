const Card = ({ title, content }) => {
  return (
    <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden card p-4">
      <h2>{title}</h2>
      {content}
    </div>
  );
};

export default Card;
