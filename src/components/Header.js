import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState("Login");
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
                    <li><Link to="/cart">Cart</Link></li>
                    <button className="btn" onClick={() => {
                        setIsLoggedIn(isLoggedIn === "Login" ? "Logout" : "Login");
                    }}>
                        {isLoggedIn}
                    </button>
                </ul>
            </nav>
        </div>
    )
}
export default Header;