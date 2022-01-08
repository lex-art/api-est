const express = require("express");
const morgan = require("morgan"); // lleva registros de la peticiones
const helmet = require("helmet"); // ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP
const cors = require("cors");

require("dotenv").config(); // Esta es una forma concisa de configurar variables de entorno en un proceso de Node js

// middleware no found route
const middlewareNoFound = require("./middleware");
const api = require("./api");

const app = express();
// use middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json()); // se encarga de configurar todo para devolver una peticion dependiendo su contente type

app.get("/", (_, res) => {
  res.json({
    message: `Welcome to my API-TEST, By Oscar Chanax, starts to consume the service: http://localhost:${
      process.env.PORT || 5000
    }/api`
  });
});

app.use("/api", api);

app.use(middlewareNoFound.notfound);
app.use(middlewareNoFound.errorHandler);

module.exports = app;
