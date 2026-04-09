import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../utils/config";

const readResponse = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const Signup = () => {
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      setError("");

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailId,
          password,
        }),
      });

      const data = await readResponse(res);

      if (!res.ok) throw new Error(data?.message || "Signup failed");

      login(data);
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="page-eyebrow">Create Account</p>
        <h2>Join Mealio</h2>
        <p className="auth-subtitle">
          Sign up to save your session and start building your cart faster.
        </p>

        <div className="auth-form">
          <input
            className="auth-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="auth-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="auth-field"
            type="email"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            className="auth-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn auth-submit" type="button" onClick={handleSignup}>
            Signup
          </button>
        </div>

        {error && <p className="auth-message auth-message-error">{error}</p>}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
