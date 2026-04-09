const Shimmer = () => {
  return (
    <div className="shimmer page-shell">
      <section className="home-hero shimmer-hero shimmer-enter">
        <div className="home-hero-copy">
          <p className="page-eyebrow">Curated for every craving</p>
          <h1>Discover restaurants that feel worth ordering from.</h1>
          <p>
            Browse faster, filter smarter, and build your cart in a cleaner,
            calmer interface.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card shimmer-stat">
            <span>20</span>
            <p>restaurants matching your filters</p>
          </div>
          <div className="stat-card shimmer-stat">
            <span>8</span>
            <p>cards shown per page for easy browsing</p>
          </div>
        </div>
      </section>

      <div className="filter shimmer-filter shimmer-enter delay-1">
        <input
          className="search-box"
          type="text"
          placeholder="Search restaurants or cuisines"
          disabled
        />
        <button className="btn btn-secondary" type="button" disabled>
          Top Rated Restaurants
        </button>
        <button className="btn btn-secondary" type="button" disabled>
          Pure Veg Restaurants
        </button>
        <button className="btn btn-secondary" type="button" disabled>
          Cost Under ₹500
        </button>
      </div>

      <div className="shimmer-container shimmer-enter delay-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div className="shimmer-card" key={i}></div>
        ))}
      </div>

      <div className="pagination shimmer-pagination shimmer-enter delay-3">
        <button type="button" disabled>
          Prev
        </button>
        <span>Page 1</span>
        <button type="button" disabled>
          Next
        </button>
      </div>
    </div>
  );
};
 
export default Shimmer;
