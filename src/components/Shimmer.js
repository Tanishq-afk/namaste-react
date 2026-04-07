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
                {Array.from({ length: 20 }, (_, i) => (
                    <div className="shimmer-card" key={i}></div>
                ))}
            </div>
        </div>
    );
}
 
export default Shimmer;