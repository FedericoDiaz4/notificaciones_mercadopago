import express from 'express';
import https from 'https';

import fs from 'fs';
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/fullchain.pem"),
  };

const app = express();
const url = "/api";
const idsMerchantOrdersCaja1 = []
const idsMerchantOrdersCaja2 = []
const idsMerchantOrdersCaja3 = []
const idsMerchantOrdersCaja4 = []

app.use(express.json());

app.get(`${url}`, (request, response) => {
    console.log("TEST");
    response.status(200).send("<h1>CMSIS API RECEPTORA DE NOTIFICACIONES MERCADOPAGO</h1>");
});

app.get(`${url}/caja1`, (request, response) => {
    console.log("Sistema CMSIS buscando ID para la caja 1");
    if (idsMerchantOrdersCaja1.length > 0) {
      const idResponse = idsMerchantOrdersCaja1[0];
      response.status(200).json({ id: idResponse });
    } else {
      response.status(204).json({ error: "not data" });
    }
});

app.delete(`${url}/caja1`, (request, response) => {
    console.log("Borrando id Caja 1");
    console.log(idsMerchantOrdersCaja1);
    const idDeleted = idsMerchantOrdersCaja1.slice(0, 1);
    idsMerchantOrdersCaja1.length = 0;
    console.log(idsMerchantOrdersCaja1);
    response.status(200).json({ idBorrado: idDeleted });
});

app.post(`${url}/caja1`, (request, response) => {
    console.log("Respuesta MP Recibida Para Caja 1");
    const body = request.body;
    console.log(body);
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
  
  