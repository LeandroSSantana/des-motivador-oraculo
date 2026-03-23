require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/*
Carrega banco local de frases
*/
const banco = {
  trabalho: JSON.parse(
    fs.readFileSync("./frases/trabalho.json")
  ),
  vida_pessoal: JSON.parse(
    fs.readFileSync("./frases/vida_pessoal.json")
  ),
  vida_amorosa: JSON.parse(
    fs.readFileSync("./frases/vida_amorosa.json")
  )
};

/*
Endpoint principal
*/
app.post("/mensagem", (req, res) => {

  const { tipo } = req.body;

  const lista = banco[tipo];

  if (!lista) {

    return res.json({
      mensagem: "Nem o destino sabe responder isso."
    });

  }

  /*
  Seleciona frase aleatória
  */
  const indiceAleatorio =
    Math.floor(Math.random() * lista.length);

  const mensagem = lista[indiceAleatorio];

  res.json({ mensagem });

});

/*
Compatibilidade com Render
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`);

});