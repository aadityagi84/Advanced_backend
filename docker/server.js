import "dotenv/config";
import app from "./src/index.js";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(
    `Server running at http://localhost:${PORT} | Started at ${new Date().toLocaleTimeString()}`,
  );
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exitCode = 1;
});

function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);

  server.close((err) => {
    if (err) {
      console.error("Server shutdown failed:", err);
      process.exitCode = 1;
      return;
    }

    console.log("HTTP server closed successfully.");
    process.exitCode = 0;
  });
}

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
