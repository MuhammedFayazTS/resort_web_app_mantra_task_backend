import express from "express";
const app = express();
const port = process.env.PORT ?? "3005";

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Restaurant app backend listening on port:${port}`);
});
