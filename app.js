const express = require("express");
const http = require('http')
const app = express();
//const hostname = 'http://api.puthrakameshtiyagam.com';
const port = 3000;
const userRoutes = require("./routes/routes.js")
const cors = require('cors');
app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World! I am your new NodeJS app! \n');
});
app.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});