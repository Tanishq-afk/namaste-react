import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const {resData} = props;
    const  {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo
    } = resData;
    return (
        <div className="res-card">
            <img className="res-img" src={CDN_URL + cloudinaryImageId} alt="Restaurant Image" />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>Rating: {avgRating} stars</h4>
            <h4>{costForTwo}</h4>
        </div>

    )
}

export default RestaurantCard;