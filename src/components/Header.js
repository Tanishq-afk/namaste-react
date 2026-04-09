import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import OnlineStatus from "./OnlineStatus";

const Header = () => {
  const { auth, logout } = useAuth();
  const { totalItems } = useCart();
  const { loading, token, user } = auth;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>

      <nav className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>
            <Link to="/cart">Cart ({totalItems})</Link>
          </li>
        </ul>

        <div className="auth-bar">
          <OnlineStatus />

          {!token ? (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn">Signup</button>
              </Link>
            </>
          ) : (
            <>
              <span className="auth-user">Hi, {user?.name}</span>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
