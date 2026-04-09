import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { API_BASE, GOOGLE_CLIENT_ID } from "../utils/config";

const readResponse = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const Login = () => {
  const { login } = useAuth();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleLogin = async () => {
    try {
      clearMessages();

      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId, password }),
      });

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      login(data);
      setSuccess("Logged in successfully");
    } catch (err) {
      setSuccess("");
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      clearMessages();

      if (!credentialResponse?.credential) {
        throw new Error("Google token not received");
      }

      const res = await fetch(`${API_BASE}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential,
        }),
      });

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data?.message || "Google login failed");
      }

      login(data);
      setSuccess("Logged in successfully");
    } catch (err) {
      setSuccess("");
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="page-eyebrow">Welcome Back</p>
        <h2>Login to continue</h2>
        <p className="auth-subtitle">
          Access your saved session and continue building your order.
        </p>

        <div className="auth-form">
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

          <button className="btn auth-submit" type="button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {GOOGLE_CLIENT_ID && (
          <div className="google-login-wrap">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google Login Failed")}
            />
          </div>
        )}

        {success && <p className="auth-message auth-message-success">{success}</p>}
        {error && <p className="auth-message auth-message-error">{error}</p>}

        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
