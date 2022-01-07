const express = require("express");
const cors =  require('cors');
const app = express();
//para aceptar los parametros de body se hace esto, parsea el body de la peticion
app.use(cors());
app.use(express.json());

//const app = http.createServer((request, response) => {
//    response.writeHead(200, {'Content-Type': 'application/json'})
//    response.end(JSON.stringify(fruits));
//});

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

const fruits = [
  { name: "Apple" },
  { name: "Orange" },
  { name: "Plum" },
  { name: "Gold" },
];

app.get("/api/notes", (req, res) => {
  res.json(fruits);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  res.json({ id });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serve runngin on port  ${PORT}`);
});
