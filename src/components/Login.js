import { useState } from "react";
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
      setSuccess("Loggedin successfully");
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
      setSuccess("Loggedin successfully");
    } catch (err) {
      setSuccess("");
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>OR</p>

      {GOOGLE_CLIENT_ID && (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google Login Failed")}
        />
      )}

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
