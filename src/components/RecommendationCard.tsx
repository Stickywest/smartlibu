type Props = {
    title: string;
  };
  
  const RecommendationCard = ({ title }: Props) => (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Great for expanding your knowledge.</p>
          <a href="#" className="btn btn-primary">Borrow</a>
        </div>
      </div>
    </div>
  );
  
  export default RecommendationCard;
  