require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const banco = {
  trabalho: JSON.parse(fs.readFileSync("./frases/trabalho.json")),
  vida_pessoal: JSON.parse(fs.readFileSync("./frases/vida_pessoal.json")),
  vida_amorosa: JSON.parse(fs.readFileSync("./frases/vida_amorosa.json"))
};

app.post("/mensagem", (req, res) => {

  const { tipo } = req.body;

  const lista = banco[tipo];

  if (!lista) {

    return res.json({
      mensagem: "Nem o destino sabe responder isso."
    });

  }

  const diaDoAno = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
    86400000
  );

  const mensagem = lista[diaDoAno % lista.length];

  res.json({ mensagem });

});

app.listen(3000, () => {

  console.log("Servidor rodando em http://localhost:3000");

});