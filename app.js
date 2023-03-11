// Importing express to the application
const express = require("express");

// Creating the application object from express
const app = express();

const wishlistRouter = require("./Routers/wishlistRouter");

// creating the port
const port = 8001;

app.use("/api/countries", wishlistRouter);

app.set("title", "My Site");
app.get("title"); // "My Site"

// Initializing the server
app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
