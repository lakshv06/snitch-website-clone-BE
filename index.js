import startServer from "./src/server.js";

let app = startServer();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });