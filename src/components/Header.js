import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState("Login");
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="logo" />
            </div>
            <nav className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
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