import { LOGO_URL } from "../utils/constants";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import OnlineStatus from "./OnlineStatus";

const Header = () => {
  const { auth, logout } = useAuth();
  const { totalItems } = useCart();
  const { loading, token, user } = auth;

  if (loading) return <div className="header-loading">Loading...</div>;

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link is-active" : "nav-link";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo-container">
          <img className="logo" src={LOGO_URL} alt="Mealio logo" />
          <div className="brand-copy">
            <span className="brand-name">Mealio</span>
            <span className="brand-tagline">Fresh picks, simple ordering</span>
          </div>
        </Link>

        <nav className="nav-items">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={navLinkClass}>
                Cart <span className="nav-badge">{totalItems}</span>
              </NavLink>
            </li>
          </ul>

          <div className="auth-bar">
            <OnlineStatus />

            {!token ? (
              <>
                <Link to="/login">
                  <button className="btn btn-secondary" type="button">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn" type="button">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <>
                <span className="auth-user">Hi, {user?.name}</span>
                <button className="btn" type="button" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
