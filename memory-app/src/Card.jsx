function Card({ image, name, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <img src={image} />
      <h1>{name}</h1>
    </div>
  );
}
export default Card;
