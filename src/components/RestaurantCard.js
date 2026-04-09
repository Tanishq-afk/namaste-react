import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resData;

  return (
    <div className="res-card">
      <div className="res-image-wrap">
        <img
          className="res-img"
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant"
        />
      </div>
      <div className="res-card-body">
        <div className="res-card-top">
          <h3>{name}</h3>
          <span className="res-rating">{avgRating} ★</span>
        </div>
        <p className="res-cuisines">{cuisines.join(", ")}</p>
        <p className="res-cost">{costForTwo}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
