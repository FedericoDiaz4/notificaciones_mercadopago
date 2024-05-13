import express from "express";
import https from "https";
import { getId, deleteId } from "./funciones.js";
import winston from "winston";
import fs from "fs";
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/fullchain.pem"),
};

const app = express();
const url = "/api";

const idsMerchantOrdersCaja1 = [];
const idsMerchantOrdersCaja2 = [];
const idsMerchantOrdersCaja3 = [];
const idsMerchantOrdersCaja4 = [];

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use(express.json());

app.get(`${url}`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} TEST`
  );
  response
    .status(200)
    .send("<h1>CMSIS API RECEPTORA DE NOTIFICACIONES MERCADOPAGO</h1>");
});

app.get(`${url}/caja1`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Sistema CMSIS buscando ID para la caja 1`
  );
  const idMerchantOrder = getId(idsMerchantOrdersCaja1);
  if (idMerchantOrder != null) {
    response.status(200).json({ id: idMerchantOrder });
  } else {
    response.status(204).json({ error: "not data" });
  }
});

app.get(`${url}/caja2`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Sistema CMSIS buscando ID para la caja 2`
  );
  const idMerchantOrder = getId(idsMerchantOrdersCaja2);
  if (idMerchantOrder != null) {
    response.status(200).json({ id: idMerchantOrder });
  } else {
    response.status(204).json({ error: "not data" });
  }
});

app.get(`${url}/caja3`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Sistema CMSIS buscando ID para la caja 3`
  );
  const idMerchantOrder = getId(idsMerchantOrdersCaja3);
  if (idMerchantOrder != null) {
    response.status(200).json({ id: idMerchantOrder });
  } else {
    response.status(204).json({ error: "not data" });
  }
});

app.get(`${url}/caja4`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Sistema CMSIS buscando ID para la caja 4`
  );
  const idMerchantOrder = getId(idsMerchantOrdersCaja4);
  if (idMerchantOrder != null) {
    response.status(200).json({ id: idMerchantOrder });
  } else {
    response.status(204).json({ error: "not data" });
  }
});

app.delete(`${url}/caja1`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Borrando id Caja 1 ${idsMerchantOrdersCaja1}`
  );
  const idDeleted = deleteId(idsMerchantOrdersCaja1);
  if (idDeleted != null) {
    idsMerchantOrdersCaja1.length = 0;
    response.status(200).json({ idBorrado: idDeleted });
  } else {
    response.status(204).json({ error: "No hay Id's que borrar" });
  }
});

app.delete(`${url}/caja2`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Borrando id Caja 1 ${idsMerchantOrdersCaja1}`
  );
  const idDeleted = deleteId(idsMerchantOrdersCaja2);
  if (idDeleted != null) {
    idsMerchantOrdersCaja2.length = 0;
    response.status(200).json({ idBorrado: idDeleted });
  } else {
    response.status(204).json({ error: "No hay Id's que borrar" });
  }
});

app.delete(`${url}/caja3`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Borrando id Caja 1 ${idsMerchantOrdersCaja1}`
  );
  const idDeleted = deleteId(idsMerchantOrdersCaja3);
  if (idDeleted != null) {
    idsMerchantOrdersCaja3.length = 0;
    response.status(200).json({ idBorrado: idDeleted });
  } else {
    response.status(204).json({ error: "No hay Id's que borrar" });
  }
});

app.delete(`${url}/caja4`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Borrando id Caja 1 ${idsMerchantOrdersCaja1}`
  );
  const idDeleted = deleteId(idsMerchantOrdersCaja4);
  if (idDeleted != null) {
    idsMerchantOrdersCaja1.length = 0;
    response.status(200).json({ idBorrado: idDeleted });
  } else {
    response.status(204).json({ error: "No hay Id's que borrar" });
  }
});

app.post(`${url}/caja1`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Respuesta MP Recibida Para Caja 1`
  );
  const body = request.body;
  logger.info(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (idsMerchantOrdersCaja1.length > 0) {
      idsMerchantOrdersCaja1.splice(0, idsMerchantOrdersCaja1.length);
      idsMerchantOrdersCaja1.push(idMerchantOrder);
    } else {
      idsMerchantOrdersCaja1.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

app.post(`${url}/caja2`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Respuesta MP Recibida Para Caja 2`
  );
  const body = request.body;
  logger.info(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (idsMerchantOrdersCaja2.length > 0) {
      idsMerchantOrdersCaja2.splice(0, idsMerchantOrdersCaja2.length);
      idsMerchantOrdersCaja2.push(idMerchantOrder);
    } else {
      idsMerchantOrdersCaja2.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

app.post(`${url}/caja3`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Respuesta MP Recibida Para Caja 3`
  );
  const body = request.body;
  logger.info(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (idsMerchantOrdersCaja3.length > 0) {
      idsMerchantOrdersCaja3.splice(0, idsMerchantOrdersCaja3.length);
      idsMerchantOrdersCaja3.push(idMerchantOrder);
    } else {
      idsMerchantOrdersCaja3.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

app.post(`${url}/caja4`, (request, response) => {
  logger.info(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Respuesta MP Recibida Para Caja 4`
  );
  const body = request.body;
  logger.info(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (idsMerchantOrdersCaja4.length > 0) {
      idsMerchantOrdersCaja4.splice(0, idsMerchantOrdersCaja4.length);
      idsMerchantOrdersCaja4.push(idMerchantOrder);
    } else {
      idsMerchantOrdersCaja4.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

const PORT = process.env.PORT || 3001;

https.createServer(options, app).listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

/*
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
*/
