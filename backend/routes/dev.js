const express = require("express");

const devRouter = express.Router();

devRouter.get("/test/google-auth", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Google Auth Test</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        margin: 0;
        padding: 24px;
        background: #f7f8fb;
        color: #161a23;
      }
      .card {
        max-width: 720px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #e4e7ef;
        border-radius: 12px;
        padding: 20px;
      }
      h1 {
        margin: 0 0 8px;
      }
      p {
        margin: 0 0 16px;
      }
      #status {
        margin: 12px 0;
        font-size: 14px;
        color: #2f3a52;
      }
      #output {
        margin-top: 12px;
        background: #0f172a;
        color: #e2e8f0;
        padding: 12px;
        border-radius: 8px;
        white-space: pre-wrap;
        word-break: break-word;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>Google Sign-In Test</h1>
      <p>Signs in with Google and calls <code>/auth/google</code>.</p>
      <div id="googleButton"></div>
      <div id="status">Waiting for Google SDK...</div>
      <pre id="output">No response yet.</pre>
    </main>

    <script>
      const GOOGLE_CLIENT_ID = ${JSON.stringify(clientId)};
      const statusEl = document.getElementById("status");
      const outputEl = document.getElementById("output");

      function setStatus(message) {
        statusEl.textContent = message;
      }

      function setOutput(value) {
        outputEl.textContent =
          typeof value === "string"
            ? value
            : JSON.stringify(value, null, 2);
      }

      async function readBody(response) {
        const text = await response.text();
        try {
          return text ? JSON.parse(text) : {};
        } catch {
          return { raw: text };
        }
      }

      async function handleCredentialResponse(credentialResponse) {
        try {
          setStatus("Google credential received. Calling backend...");

          const loginResponse = await fetch("/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              idToken: credentialResponse.credential,
            }),
          });

          const loginBody = await readBody(loginResponse);

          if (!loginResponse.ok) {
            setStatus("Backend Google login failed");
            setOutput(loginBody);
            return;
          }

          setStatus("Google login successful ✅");

          setOutput({
            message:
              loginBody.message || "Google login successful",
          });
        } catch (error) {
          setStatus("Unexpected error");
          setOutput({ error: error.message });
        }
      }

      function initGoogle() {
        if (!GOOGLE_CLIENT_ID) {
          setStatus("Missing GOOGLE_CLIENT_ID in backend env");
          return;
        }

        if (
          !window.google ||
          !window.google.accounts ||
          !window.google.accounts.id
        ) {
          setStatus("Google SDK not loaded yet. Refresh once.");
          return;
        }

        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          error_callback: (error) => {
            setStatus("Google popup error");
            setOutput(error || { error: "Unknown Google popup error" });
          },
        });

        google.accounts.id.renderButton(
          document.getElementById("googleButton"),
          {
            theme: "outline",
            size: "large",
            shape: "pill",
            text: "signin_with",
          }
        );

        setStatus("Ready. Click Google Sign-In.");
      }

      window.addEventListener("load", initGoogle);
    </script>
  </body>
</html>`;

  res.status(200).type("html").send(html);
});

module.exports = devRouter;