const Shimmer = () => {
    return (
        <div className="shimmer">
            <div className="filter">
                <button className="btn" disabled>Search</button>
                <button className="btn" disabled>Top Rated Restaurants</button>
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
            </div>
        </div>
    );
}
 
export default Shimmer;