const express = require("express");
const morgan = require("morgan"); // lleva registros de la peticiones
const helmet = require("helmet"); // ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP
const cors = require("cors");
const path = require("path");

require("dotenv").config(); // Esta es una forma concisa de configurar variables de entorno en un proceso de Node js

// middleware no found route
const middlewareNoFound = require("./middleware");
const api = require("./api");

const app = express();
// use middleware
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false
  })
);
app.use(cors());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  /*  res.header(
    "Cross-Origin-Resource-Policy",
    "same-site | same-origin | cross-origin"
  ); */
  next();
});

app.use(express.json({ limit: "5mb" }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./view/index.html"));
});

app.use("/api", api);

app.use(middlewareNoFound.notfound);
app.use(middlewareNoFound.errorHandler);

module.exports = app;
