const Shimmer = () => {
    return (
        <div className="shimmer">
            <div className="filter">
                <input className="search-box" type="text" disabled />
                <button className="btn" disabled>Top Rated Restaurants</button>
                <button className="btn" disabled>Pure Veg Restaurants</button>
                <button className="btn" disabled>Cost Under ₹500</button>
            </div>
            <div className="shimmer-container">
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
            </div>
        </div>
    );
}
 
export default Shimmer;